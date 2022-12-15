---
layout: contents
title: Apis Contents
description: Technical documentation and guides for software development in BCC
---

# Menu
- [Menu](#menu)
- [Overview](#overview)
- [Environments](#environments)
    - [Sandbox](#sandbox)
    - [Production](#production)
- [Getting Started](#getting-started)
  - [Request access](#request-access)
  - [Generate a token](#generate-a-token)
    - [Example in cURL](#example-in-curl)
    - [Example response](#example-response)
  - [Use the token](#use-the-token)
    - [Example in cURL](#example-in-curl-1)
- [API Explorer](#api-explorer)

# Overview
- This API is the official source of personal data for Machine-To-Machine applications in BCC.
- Authentication is done with [oauth2 client credentials flow](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)
- Permissions are managed with scopes

# Environments
All APIs are availible for 2 environments. Sandbox is meant for use in local development and staging/sandbox environment for your app. Production should only be used in production deployments.

Both environments are essentially the same. The only difference is that the sandbox environment has fictitious data.
In usage they are also the same. You only need to use different values here, which are referenced further in the documentation.
### Sandbox
```sh
IDENTITY_SERVER_ORIGIN="https://bcc-sso-sandbox.eu.auth0.com"
API_ORIGIN="https://sandbox-api.bcc.no"
API_AUDIENCE="sandbox-api.bcc.no"
```
   
### Production
```sh
IDENTITY_SERVER_ORIGIN="https://login.bcc.no"
API_ORIGIN="https://api.bcc.no"
API_AUDIENCE="api.bcc.no"
```

# Getting Started

## Request access 
We recommend first using the sandbox for local development, and only getting the production access when releasing the product
   1. Write a email to [it@bcc.no](mailto:it@bcc.no), your email should include the following information.
       * The environment to which you need access
       * Name for your application
       * Scopes you need access to, with a reason for each scope
       * Link to the privacy policy (if the application is third party)
   2. BCC IT will respond to your request with OAuth2 ```CLIENT_ID``` and ```CLIENT_SECRET``` of the application with access to the requested environment.

## Generate a token

Use the credentials to get an access token to our APIs

### Example in cURL
```sh
curl --request POST \
  --url $IDENTITY_SERVER_ORIGIN/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"$CLIENT_ID","client_secret":"$CLIENT_SECRET","audience":"$API_AUDIENCE","grant_type":"client_credentials", "scope":"persons.name#read persons.birth_date#read"}'
```

### Example response
```json
{
  "access_token": "ACCESS_TOKEN",
  "scope": "persons.name#read persons.birth_date#read",
  "expires_in": 86400,
  "token_type": "Bearer"
}
```

## Use the token

Attach the access token to all requests to our APIs.
Token should be present in the ```Authorization``` header, prefixed with ```"Bearer "```

### Example in cURL
```sh
curl --request GET \
  --url $API_ORIGIN/persons/1 \
  --header 'Authorization: Bearer $ACCESS_TOKEN' \
```

# API Explorer

All of our APIs support an API explorer. To use it:

1. Go to the API Explorer page ([Production](https://api.bcc.no/docs/), [Sandbox](https://sandbox-api.bcc.no/docs/))
2. Select the API in the top right corner
3. Click "Authorize"
4. Provide your credentials and select the scopes you want to use
5. Now you can try out the availible endpoints
