---
description: 'Authenticating with BCC''s membership api, you can use multiple paths'
---

# Authentication

## Concept

The BCC Membership API allows to either be authenticated as an organization or as an end user. Typically in order to authenticated as an end user an id\_token should be provided and in order to authenticate as an organization an api-key should be provided. 

### Authentication as an end user

Normally authentication through an end-user happens via a client \(web or mobile app\). The client in such a case will be responsible for logging the user in via an identity provider and thus receiving an id\_token which the server will except. All request from the client to the server will then be accompanied with id\_token. In the server the request will then be executed in the context of the end user and based on he permissions of the end user

### Authenticating as an organization

Authenticating as an organization can happen by provider and api-key. The api-key can be obtained by contacting Service Center \(servicesenter@bcc.no\).



## ID Token

## Access Token 

Steps

1. Get a access token from the [BCC's identity provider](https://login.bcc.no/.well-known/openid-configuration)
2. Add the token to the Authorization Header
3. Make a request to the to the [api endpoint](https://members.bcc.no/docs/?url=/docs#/).



## Api Key

## Client

