# Single Sign Out
This page contains a description of Single Sign Out system, rolled out in sole purpose of letting BCC end users to log out of all BCC related apps at once.

## Menu
- [Home](index)
- [API integration](api-integration)
- [Authentication](authentication)
- [Webhooks integration](webhooks)
- [Data Structures and Scopes](data-structures-and-scopes)
- [Single Sign Out](single-sign-out)


## Sign out - purpose
BCC uses Auth0 as main identity and authentication/authorization provider. BCC also uses OAuth protocol with OpenID Connect Identity Layer instead of SAML which means that out-of-the-box features of Auth0 are not enough to provide uniformed, federated sign-out experience, thus Single Sign Out project was born. Previous Sign-out component was imitating front-channel logout described [here](https://openid.net/specs/openid-connect-frontchannel-1_0.html).

Current solution is modelled after OpenId Connect back-channel logout, described [here](https://openid.net/specs/openid-connect-backchannel-1_0.html).

## How it works?

BCC Single Sign Out is comprised of:
- rules added to Auth0 Auth pipeline
- NodeJS server running on Google Cloud Platform (Cloud Run)
- Redis cache server running on Google Cloud Platform (Google Cloud Memorystore for Redis API)

It works as follow:
1. User goes to any BCC website/web application integrated with Auth0
2. User wants to log in.
3. During login attempt, rules added to Auth pipeline in Auth0 create session identifier, composed of user Auth0 ID and timestamp of login.
4. This global Session ID is sent to Sign Out endpoint ```/usersession``` alongside appId that user is logging into.
5. Sign out stores that session metadata in Redis, indexed by Global Session ID.
6. The rest of login flow is unchanged.

In that way Sign out gathers metadata of all sesion created for all BCC users. Once user want to log out, e.g. by using topbar or any app that integrated itself with Sign Out:
1. User clicks on Logout button.
2. User gets redirected to Sign Out ```/logout``` endpoint.
3. User needs to login if not authenticated.
4. Sign Out finds all sessions of said user that match Global Session ID.
5. Sign Out fetches application data for each app that it found session for.
6. Sign Out sends web request for each application that proper configuration has been found.
These requests are callbacks, meant to inform application, that users is logging out and his/her local sessions should be cleared.
7. Sign Out redirects user to Auth0 logout endpoint, terminating Auth0 session.

## How to configure my app?
If you want to integrate your app, you can do it by Members UI (permissions required).
Configuration consists of only two fields 
1. Callback URL (what url should signout hit in your app)
2. HTTP Method (GET or POST)

![Screenshot from 2021-11-22 17-20-36](https://user-images.githubusercontent.com/16034216/142897335-d4be151f-2120-457d-8791-ea0050a2343f.png)

You can choose endpoint and HTTP method but not query string or params. 

If you select GET request, Sign Out will add ```?userid=USER_ID``` query string to request. 

If you select POST request, ```userId``` will be sent in JSON body of a request.

EXAMPLE: Based on configuration shown in image, Sign Out would try to send GET request to ```http://mockserver:555/logout?userId=USERID```

Your app responsibility is to clear any local session of user in question and return Sign Out request with status 200.
