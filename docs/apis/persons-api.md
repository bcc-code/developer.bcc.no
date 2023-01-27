---
order: 0
---

# Persons API

This API is the official source of personal data for Machine-To-Machine applications in BCC. If you're creating a third party application, you will need to get user's consent in order to get access to their data

## Getting Started

### Use an SDK if available
You can find available SDKs [here](#sdks)

### Get an access token
The process is described in [APIs page](./index.md).

### Use the token to get data from the API

#### Example in cURL
```sh
curl --request GET \
  --url $API_ORIGIN/persons/1 \
  --header 'Authorization: Bearer $ACCESS_TOKEN' \
```

#### Example response
```json
{
    "data":{
        "age":30,
        "birthDate":"1990-01-01",
        "displayName":"John Doe",
        "firstName":"John",
        "lastChangedDate":"2019-12-09T00:18:18.615Z",
        "lastName":"Doe",
        "middleName":"",
        "personID":1
    }
}
```

## User Consent

If the application is managed by a third party, upon receiving access to the API, users will be able to give their consent to the app.

Consent settings for each user are available [here](https://members.bcc.no/profile/settings), under the "Sharing personal details with third parties" section.

## SDKs

There are SDKs availibie for the following languages:
1. [Dotnet](sdk-dotnet)

With planned support for:
1. Typescript/Javascript
2. Go

## Scopes

Scope descriptions are available [here](scopes)
