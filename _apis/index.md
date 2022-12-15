---
layout: contents
title: Apis Contents
description: Technical documentation and guides for software development in BCC
---

# Menu
- [Menu](#menu)
- [Overview](#overview)
- [Environments](#environments)
- [Getting Started](#getting-started)
- [API Explorer](#api-explorer)

# Overview
- This API is the official source of personal data for Machine-To-Machine applications in BCC.
- Authentication is done with [oauth2 client credentials flow](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)
- Permissions are managed with scopes

# Environments
All APIs are availible for 2 environments. Sandbox is meant for use in local development and staging/sandbox environment for your app. Production should only be used in production deployments.

Both environments are essentially the same. The only difference is that the sandbox environment has fictitious data.
In usage they are also the same. You only need to use different values here, which are referenced further in the documentation.
1. Sandbox
   1. ```IDENTITY_SERVER_ORIGIN="https://bcc-sso-sandbox.eu.auth0.com"```
   2. ```API_ORIGIN="https://sandbox-api.bcc.no"```
   3. ```API_AUDIENCE="sandbox-api.bcc.no"```
2. Production
   1. ```IDENTITY_SERVER_ORIGIN="https://login.bcc.no```
   2. ```API_ORIGIN="https://api.bcc.no"```
   3. ```API_AUDIENCE="api.bcc.no"```

# Getting Started

To strat using the API:
1. Request access to the API (we recommend first using the sandbox for local development, and only getting the production access when releasing the product)
   1. Write a email to [it@bcc.no](mailto:it@bcc.no), your email should include the following information.
       * The environment to which you need access
       * Name for your applications
       * Scopes you need access to, with a reason for each scope
       * Link to the privacy policy (if the application is third party)
   2. BCC IT will respond to your request with OAuth2 ```CLIENT_ID``` and ```CLIENT_SECRET``` of the application with access to the requested environment.
2. If you want to use an SDK you can refer to the relevant documentation [here](#sdks)
3. Otherwise, Use the credentials to generate a token
   1. Example in cURL
```sh
curl --request POST \
  --url $IDENTITY_SERVER_ORIGIN/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"$CLIENT_ID","client_secret":"$CLIENT_SECRET","audience":"$API_AUDIENCE","grant_type":"client_credentials", "scope":"persons.name#read persons.birth_date#read"}'
```
   2. Example response in json format
```json
{
  "access_token": "ACCESS_TOKEN",
  "scope": "persons.name#read persons.birth_date#read",
  "expires_in": 86400,
  "token_type": "Bearer"
}
```
4. Attach the token to to the ```Authorization``` header and send a request to the API
   1. Example in cURL
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
