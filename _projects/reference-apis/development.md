---
description: 'For the purpose of development, retrieving tokens in an easy way'
---

# Dummy SSO provider for Development

### Description

Often during local development you need an id\_token or access token in order to run you're tests for example. This is often challenging because you need to authenticate an production user in order to get the required access tokens which means you have to expose the users credentials, which not desired. To make this process easier we deployed a dummy identity provider with reduced security and which does not required the end user to sign in in order to get the required tokens.

### Retrieve an id\_token

```text
https://dummy.login.bcc.no/connect/authorize?
    client_id=RandomUser&
    scope=openid email profile&
    response_type=token code&
    redirect_uri=https://localhost/login/callback&
    state=abc&
    nonce=xyz
 
// To copy and paste into the browser
https://dummy.login.bcc.no/connect/authorize?client_id=RandomUser&scope=openid email profile&response_type=code id_token token&redirect_uri=https://localhost/login/callback&state=abc&nonce=xyz



```

Notice the following

* Normally the redirect uri had to be registered on the client in the identity provider config. With the dummy server this is not a requirement, you can specify any redirect uri at will.
* The client\_id is set to "RandomUser", this means you would get back tokens for a random user, this is often useful for load testing. If you would like always get the same user back set the client\_id to "SameUser"
* We generated 6000 Test User, which mean that if you set client\_id to "RandomUser", it will pick a random user between 1 and 6000. If you set client\_id to "SameUser" it will always return the first generated test user.



