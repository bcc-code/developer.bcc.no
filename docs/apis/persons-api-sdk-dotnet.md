# Persons API SDK Dotnet

This is the official dotnet SDK for the persons API.
The SDK supports Linq expressions to easily query person data.

## Install

Package is availible on Nuget
```sh
dotnet add package BccCode.Persons.Api.Client
dotnet add package BccCode.Persons.Api.Contracts
```

## Configure

1. Import the client package
   ```cs
   using BccCode.Persons.Api.Client
   ```

2. Create the client
   ```cs
   var options = new PersonsApiClientOptions{
       ClientId = "CLIENT_ID",
       ClientSecret = "CLIENT_SECRET",
       ApiBasePath = "API_ORIGIN",
       Audience = "API_AUDIENCE",
       Authority = "IDENTITY_SERVER_ORIGIN",
       Scope = $"{PersonsApiScope.ReadName} {PersonsApiScope.ReadGender}"
   };
   var client = new PersonsApiClient(options);
   ```

## Use the client

### Get a single person
```cs
var person = await client.getPersonAsync(1234)
```


### Get all the persons
```cs
var allPersons = await client.getPersonsAsync()
```

### Get filtered persons
```cs
var personsUnderTwoYearsOld = await client.getQueryable().Where(p => p.Age < 2).ToListAsync();
```
