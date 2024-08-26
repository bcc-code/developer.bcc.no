# DevOps tips

This is a collection of tips that may be useful for developers.

## Group IAM authentication to CLoud SQL from Cloud Run

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