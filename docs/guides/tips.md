# DevOps tips

This is a collection of tips that may be useful for developers.

## Group IAM authentication to Cloud SQL from Cloud Run

1. Use the Cloud SQL integration from Cloud Run to get a secure connection to Cloud SQL through an Unix socket:

```hcl
# Example Terraform code
resource "google_cloud_run_v2_service" "main" {
  name     = "cloudrun-service"
  location = local.props.gcp.location
  deletion_protection = false
  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = google_service_account.main.email
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }

      volume_mounts {
        name = "cloudsql"
        mount_path = "/cloudsql"
      }
    }

    scaling {
      max_instance_count = 2
    }

    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [google_sql_database_instance.main.connection_name] # Put yours here
      }
    }
  }
}

resource "google_sql_database_instance" "main" {
  name             = "sql-${local.props.project_name}-${local.props.app_environment}"
  database_version = "POSTGRES_17"
  region           = local.props.gcp.location

  settings {

    // ...

    database_flags {
      name  = "cloudsql.iam_authentication"
      value = "on"
    }
  }

  // ...
}
```

2. Use the following Terraform code to enable Group IAM auth:

```hcl
resource "google_project_iam_member" "cloud_sql_client" {
  # For all sysadmin groups (or dev groups for envs other than prod and staging) deploy this.
  for_each = (local.props.app_environment == "prod" || local.props.app_environment == "staging" ?
    local.props.iam_groups["sysadmin"] :
    merge(local.props.iam_groups["developer"], local.props.iam_groups["sysadmin"])
  )

  project = data.google_project.main.project_id
  role    = "roles/cloudsql.client"                # Enables connecting to any Cloud SQL instance in the project.
  member  = "group:${each.value.gcp_principal_id}" # "group:group_email@bcc.no"
}

resource "google_project_iam_member" "cloud_sql_iam_login" {
  for_each = (local.props.app_environment == "prod" || local.props.app_environment == "staging" ?
    local.props.iam_groups["sysadmin"] :
    merge(local.props.iam_groups["developer"], local.props.iam_groups["sysadmin"])
  )

  project = data.google_project.main.project_id
  role    = "roles/cloudsql.instanceUser"          # Enables IAM authentication against all Cloud SQL instances in the project.
  member  = "group:${each.value.gcp_principal_id}" # "group:group_email@bcc.no"
}

resource "google_sql_user" "iam_group" {
  for_each = local.props.iam[local.props.app_environment == "prod" || local.props.app_environment == "staging" ? "sysadmin" : "developer"]

  name     = each.value.gcp_principal_id # "group_email@bcc.no"
  instance = google_sql_database_instance.main.name
  type     = "CLOUD_IAM_GROUP"
}

resource "postgresql_grant" "schema_usage_iam_group" {
  for_each = google_sql_user.iam_group

  database    = google_sql_database.main.name
  role        = each.value.name
  schema      = "public"
  object_type = "schema"
  privileges  = ["USAGE"]
}
```

3. In the PostgreSQL client, use the user's email address not the group email address as username.

## Service Account IAM authentication to Cloud SQL from Cloud Run with .NET

1. Use the Cloud SQL integration from Cloud Run to get a secure connection to Cloud SQL through an Unix socket. Example is in the section above.

2. Use the following Terraform code to enable Service Account IAM auth:

```hcl
resource "google_service_account" "main" {
  account_id  = "sa-run-${local.props.app_environment}"
  description = "Service Account used by Cloud Run instance"
}

resource "google_project_iam_member" "service_account_project_permissions" {
  for_each = toset([
    "roles/cloudsql.client",      # Enables connecting to any Cloud SQL instance in the project.
    "roles/cloudsql.instanceUser" # Enables IAM authentication against all Cloud SQL instances in the project.
  ])
  project = data.google_project.main.project_id
  role    = each.key
  member  = google_service_account.main.member
}

resource "google_sql_user" "iam_service_account" {
  name     = trimsuffix(google_service_account.main.email, ".gserviceaccount.com")
  instance = google_sql_database_instance.main.name # Put your own here
  type     = "CLOUD_IAM_SERVICE_ACCOUNT"
}

resource "postgresql_grant" "schema_usage_service_account" {
  database    = google_sql_database.main.name # Put your own here
  role        = google_sql_user.iam_service_account.name
  schema      = "public"
  object_type = "schema"
  privileges  = ["USAGE"]
}

# ... other necessary permissions
```

3. In the Cloud Run instance, use the following .NET code in `Program.cs` to enable authentication to the DB with automatic token refresh:

```csharp
// Add this to your Program.cs
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;

// Add database
var npgsqlDataSourceBuilder = new Npgsql.NpgsqlDataSourceBuilder(builder.Configuration["Npgsql:ConnectionString"]);
if (!string.IsNullOrEmpty(builder.Configuration["Npgsql:ConnectionString"]) && builder.Configuration["Npgsql:ConnectionString"]!.Contains("Host=/cloudsql/"))
{
	var credentials = await GoogleCredential.GetApplicationDefaultAsync();
	// We want to limit the scope of the token, so we create scoped credentials
	var scopedCredentials = credentials.CreateScoped("https://www.googleapis.com/auth/sqlservice.login");
	
	// GetAccessTokenForRequestAsync handles refreshing and caching the token so the refresh intervals can be kept short 
	npgsqlDataSourceBuilder.UsePeriodicPasswordProvider(
		(settings, cancellationToken) => new ValueTask<string>(scopedCredentials.UnderlyingCredential.GetAccessTokenForRequestAsync(cancellationToken: cancellationToken)),
		TimeSpan.FromMinutes(1), // Interval for refreshing the token
		TimeSpan.FromSeconds(0)); // Interval for retrying after a refresh failure
}
var npgsqlDataSource = npgsqlDataSourceBuilder.Build();
builder.Services.AddDbContext<DataContext>(options =>
{
	options.UseNpgsql(npgsqlDataSource, o => o.MigrationsHistoryTable("_migration"));
});
```

4. As connection string use: `Host=/cloudsql/[instance name];Database=[db name];Username=[service account email without .gserviceaccount.com at the end];SSL Mode=Disable` (SSL is not required as CloudSQL Proxy handles that)

## Linking git commit to Cloud Run revision

Linking a GitHub commit to a Cloud Run revision can be achieved by adding the following environment variables when deploying:

```yaml
        env_vars: |-
            COMMIT_URL=https://github.com/${{ github.repository }}/commit/${{ github.sha }}
            GITHUB_ACTION_URL=https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}
```

::: warning
This linking should not be used in security investigations as it can easily be faked.
:::

For security investigations signed and verified provenance information should be used. Buildkit, used to build the docker images by the `docker/build-push-action@v6` action automatically creates provenance information and uploads it to the container registry, but that provenance is not signed by default.

It appeas that signing the provenance for **private repos** requires a more complex setup that is not yet in place.
For **public repos** this can be easily achieved using [`actions/attest-build-provenance`](https://github.com/actions/attest-build-provenance) action.