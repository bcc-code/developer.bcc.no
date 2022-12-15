---
title: BCC SignOn - OpenID Connect 
description: Technical documentation and guides for software development in BCC
---

## Page Content

---

- [Getting started](#getting-started)
  - [Our Strategy](#our-strategy)
    - [Requirements](#requirements)
    - [1. HTTPS(SSL)](#1-httpsssl)
    - [2. BCC Topbar](#2-bcc-topbar)
  - [Supported Languages and CMS](#supported-languages-and-cms)
    - [Supported Languages and CMS](#supported-languages-and-cms-1)
  - [Using SignOn with other languages/CMS's](#using-signon-with-other-languagescmss)
    - [Authentication Endpoints](#authentication-endpoints)
- [Get information about the user](#get-information-about-the-user)
  - [How to request claims](#how-to-request-claims)
    - [Articles](#articles)
  - [Available claims](#available-claims)
    - [Standard OpenID Connect claims](#standard-openid-connect-claims)
    - [Additional claims of BCC Signon](#additional-claims-of-bcc-signon)
    - [_‘openid’_ scope](#openid-scope)
    - [_‘church’_ scope](#church-scope)
    - [_‘country’_ scope](#country-scope)
  - [Deprecated claims](#deprecated-claims)
    - [_‘deprecatedSignonUsername’_ scope](#deprecatedsignonusername-scope)
  - [id\_token example](#id_token-example)
- [Single logout](#single-logout)
  - [Integrate your application with single logout](#integrate-your-application-with-single-logout)
  - [Requirements](#requirements-1)
  - [Local logout](#local-logout)
    - [SPA](#spa)
    - [Regular web app](#regular-web-app)
      - [1. Create the ‘endsession’ endpoint in your application](#1-create-the-endsession-endpoint-in-your-application)
    - [Topbar setup](#topbar-setup)
      - [2. Redirect the user to the endsession endpoint](#2-redirect-the-user-to-the-endsession-endpoint)
  - [Central logout](#central-logout)
    - [1. Redirect the user to the central logout endpoint](#1-redirect-the-user-to-the-central-logout-endpoint)
  - [Backchannel logout](#backchannel-logout)
    - [Backchannel logout OIDC specification](#backchannel-logout-oidc-specification)
    - [Backchannel logout architecture](#backchannel-logout-architecture)
    - [1. Create the logout endpoint in your backend](#1-create-the-logout-endpoint-in-your-backend)
      - [Logout token payload example](#logout-token-payload-example)
    - [2. Register the logout endpoint for your application in auth0](#2-register-the-logout-endpoint-for-your-application-in-auth0)
  - [Test your setup](#test-your-setup)
- [Protect news feed and calendar](#protect-news-feed-and-calendar)
- [FAQ](#faq)
    - [What's my Redirect URI?](#whats-my-redirect-uri)
      - [Wordpress:](#wordpress)
      - [ASP.net:](#aspnet)
    - [Where can I find my Client ID and Client Secret?](#where-can-i-find-my-client-id-and-client-secret)
    - [I get redirected to a page that says 'Sorry, an error occurred':](#i-get-redirected-to-a-page-that-says-sorry-an-error-occurred)

  
# Getting started

Welcome to the section dedicated to our login system.

Here, you will find documentation about how to implement our authentication process into your application

## Our Strategy

We use the [OpenId Connect](https://openid.net/connect/) protocol to manage the connections to our authentication
system.

Because there are too many existing Content Management Systems (CMS) and languages for us to support them all, we have
decided to start with the most popular ones. See the list of Supported Languages and CMSs below.

If you implement your own solution because your language/CMS was not already supported by us, we are happy to post your
solution here, so others using the same language/CMS as you can benefit from it. An easy way to start a dialogue with us
regarding this is to send us an email at it@bcc.no.

### Requirements

Please contact support if you have any questions regarding these requirements

### 1. HTTPS(SSL)

HTTPS (SSL) must be installed on your application!

* There are multiple free services available that provide free SSL certificates (
  e.g. [Let’s Encrypt](https://letsencrypt.org/))

### 2. BCC Topbar

We encourage all applications to use the BCC topbar, this has the following advantages:

* The user can go back to the home page (BCC portal)
* The user can search for all applications related to BCC
* The user can easily logout of all BCC applications.

We would like to improve the functionality of the BCC Topbar, and are interested in feedback/suggestions from you!

## Supported Languages and CMS

* PHP, with [wordpress](https://wordpress.com/) as a CMS
* ASP.NET
* ASP.NET Core

### Supported Languages and CMS

We plan to add solutions for the following as well:

* Joomla

## Using SignOn with other languages/CMS's

We recommend using certified OpenID connect libraries

We DO NOT recommend using libraries from Auth0 directly, because these libraries will not work with any other OpenID
Connect providers.

### Authentication Endpoints

| Type:                    | URL:                                                  |
|--------------------------|-------------------------------------------------------|
| **Authorization URL**    | https://login.bcc.no/authorize                        |
| **Token URL**            | https://login.bcc.no/oauth/token                      |
| **User Info URL**        | https://login.bcc.no/userinfo                         |
| **OpenID Configuration** | https://login.bcc.no/.well-known/openid-configuration |

<br/>
<br>

---

# Get information about the user

It is possible to get additional information about the logged-in user, with the use of claims. Claims are statements (
such as name or email address) about the user.

## How to request claims

Claims can be requested via the scope parameter in the authentication request to BCC Signon. The claims will be present
in the response of the authentication request.

### Articles

[Available claims](#available-claims)
[Deprecated claims](#deprecated-claims)
[ID_token example](#id_token-example)

## Available claims

Please keep the requested claims down to the minimal required. You can always ask for additional claims later, when the
application needs them.

### Standard OpenID Connect claims

See https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims.

* profile scope
    * Claims: name, family_name, given_name, middle_name, nickname, preferred_username, picture, gender, birthdate,
      locale, and updated_at.
* email scope
    * Claims: email and email_verified.
* address scope
    * Claims: address.
* phone
    * Claims: phone_number and phone_number_verified.

### Additional claims of BCC Signon

It’s currently possible to request all available claims. Your application may require additional approval of BCC in the
future, before you have access to additional claims of the user (the claims of the ‘openid’ scope will always be
available).

### _‘openid’_ scope

| Claim name:                               | Content:                                                                                         |
|-------------------------------------------|--------------------------------------------------------------------------------------------------|
| https://login.bcc.no/claims/personId      | The primary identifier of the user in the BCC membership system (this value will never change).  |
| https://login.bcc.no/claims/hasMembership | Shows if the user has an active membership in BCC                                                |

### _‘church’_ scope

| Claim name:                            | Content:                      |
|----------------------------------------|-------------------------------|
| https://login.bcc.no/claims/churchId   | The identifier of the church  |
| https://login.bcc.no/claims/churchName | The name of the church        |

### _‘country’_ scope

| Claim name:                                  | Content:                                                                                   |
|----------------------------------------------|--------------------------------------------------------------------------------------------|
| https://login.bcc.no/claims/CountryIso2Code  | The [countryCode](https://no.wikipedia.org/wiki/ISO_3166-1_alfa-2) of the user his church  |

## Deprecated claims

These claims have been deprecated, and their use is strongly discouraged. Please contact support if your application is
dependent on theses claims.

| Claim name:                          | Content:                                                |
|--------------------------------------|---------------------------------------------------------|
| https://members.bcc.no/app_metadata  | Please use the claims of the additional “openid” scope  |

### _‘deprecatedSignonUsername’_ scope

| Claim name:                                          | Content:                                                         |
|------------------------------------------------------|------------------------------------------------------------------|
| https://login.bcc.no/claims/deprecatedSignonUsername | The username of the user that was used in the old signon system  | 

## id_token example

The id_token contains the following claims when requesting all scopes.

Payload:

````
{
  "https://login.bcc.no/claims/personId": 12345,
  "https://login.bcc.no/claims/hasMembership": true,
  "https://login.bcc.no/claims/churchId": 69,
  "https://login.bcc.no/claims/churchName": "Oslo/Follo",
  "https://login.bcc.no/claims/deprecatedSignonUsername": "johndoe",
  "https://login.bcc.no/claims/CountryIso2Code": "no",
  "given_name": "John",
  "family_name": "Doe",
  "nickname": "johndoe",
  "name": "John Doe",
  "picture": "https://s.gravatar.com/avatar/url-to-avatar-picture",
  "gender": "male",
  "birthdate": "1980-01-01T00:00:00",
  "locale": "en-US",
  "updated_at": "2019-05-29T12:15:00.383Z",
  "email": "johndoe@example.com",
  "email_verified": true,
  "phone_number": "+47 123 45 678",
}
````

<br>

---

# Single logout

single logout is the process of logging the user out of all the applications they signed into with single signon (SSO).

Single signout flow consists of 3 steps:
1. Local logout
2. Central logout
3. Backchannel logout through a webhook

## Integrate your application with single logout

This tutorial will explain you how to integrate your application with single logout.

## Requirements

HTTPS (SSL) must be installed on your application!

* There are multiple free services available that provide free SSL certificates (
  e.g. [Let’s Encrypt](https://letsencrypt.org/))
* Please contact support if you have any questions regarding SSL certificates.

**WordPress applications that have the [BCC LOGIN](https://github.com/bcc-code/bcc-wp/releases) plugin installed should not follow this tutorial (single logout
is included in the plugin).**


## Local logout

### SPA

Create a page in your app that will clear the user session.
In SPAs the session is usually stored in localStorage, sessionStorage or in-memory

### Regular web app

#### 1. Create the ‘endsession’ endpoint in your application

This is the endpoint that clears the session of the user (e.g. /account/endsession).

The endpoint needs to delete the session cookie of the user, and if the session was stored in a session store remove it from there as well.

If you are using ASP.NET you can check our documentation here:

* [ASP.NET Core](/_docs/BCC%20Signon/ASP.NET%20Core#add-account-controller)
* [ASP.NET](/_docs/BCC%20Signon/ASP.NET#add-account-controller)\

### Topbar setup

If you're using the topbar as the UI for the logout, you need to register your logout-url there.
The logout-url is registered using the ```data-logout-url``` attribute when registering the topbar widget
[Topbar Widget](/_products/bcc-widgets/topbar-widget.md)

#### 2. Redirect the user to the endsession endpoint

## Central logout

### 1. Redirect the user to the central logout endpoint

The logout endpoint is: https://LOGIN_DOMAIN/v2/logout
In production environment that would be https://login.bcc.no/v2/logout

## Backchannel logout

Backchannel logout is triggerd for all applications (that have registered it) after a user logs out centrally.

The backchannel logout is only availible for applications that have a backend that is storing the user sessions in a persistent storage (as opoposed to storing the session inside a cookie), so it can be invalidated

### Backchannel logout OIDC specification
https://openid.net/specs/openid-connect-backchannel-1_0.html

### Backchannel logout architecture
![image](logout-architecture.png)

### 1. Create the logout endpoint in your backend

The endpoint has to do the following thigs:
1. Accept a following request from auth0
   1. Method: POST
   2. Body contains an url-encoded object:
```ts
interface LogoutRequestBody {
    logout_token: string;
}
```

2. Verify the logout token
   1. The logout token is a [JWT](https://www.rfc-editor.org/rfc/rfc7519)
   2. The token signature can be verified against the auth0 JWKS (https://LOGIN_DOMAIN/.well-known/jwks.json)
   3. The ```iss``` and ```aud``` values should also be verified (the ```iss``` should contain the login domain, and the ```aud``` should equal to your application ```client_id```)
3. Invalidate the session
   1. Use the ```sid```(session id) from the token payload to invalidate/remove the corresponding session
#### Logout token payload example
```json
{
  "iss": "https://login.bcc.no/",
  "sub": "auth0|62b30b0908dcafbc2fda40a",
  "aud": "hPK4PRnpFkY5MmuoJZa31sNldB0Mprei",
  "iat": 1670000000,
  "jti": "3adae621-4423-4a22-ba4a-612beca52ede",
  "events": {
    "http://schemas.openid.net/event/backchannel-logout": {}
  },
  "trace_id": "7764a3031fe0bbda",
  "sid": "EKIRPdag3PtbAQRfG2BptNi5UThMi5AZl"
}
```

### 2. Register the logout endpoint for your application in auth0

To register the logout endpoint contact [support](mailto:it@bcc.no), providing the url of your logout endpoint

## Test your setup

To verify that you correctly configured single logout, please open a new incognito browser, and follow the following
steps:

* Sign in to your application
* Click on the “Sign out” button on the BCC topbar.
    * You should be redirected to the login screen after the logout process completed.
* Navigate back to your application
    * You should be required to sign in again with BCC signon.

<br>
  
---

# Protect news feed and calendar

The shared link for the calendar and news feed should not be protected with the signon system, but it should be
protected with the use of a ``private URL``

A private URL is a link that is very hard to guess: for example by using
a [GUID](https://en.wikipedia.org/wiki/Universally_unique_identifier). (You can create one with
this [GUID generator](https://www.guidgenerator.com/online-guid-generator.aspx).)

The syntax of a private link would be :
``https://website.com/{path}/{GUID}``

Example for the calendar feed
``https://example.com/feed/?id=4397c38e49c64977b7841f918e3ae9a7``

This is the same concept as a ‘private address’ with Google
calendars ([documentation](https://support.google.com/calendar/answer/37648?hl=en)).

<br>

---

# FAQ

### What's my Redirect URI?

The Redirect URI contains the link to which Auth0 will redirect the user after the authentication. This URI is different
for each CMS :

#### Wordpress:

The Redirect URI provided by the plugin. It can be found at the bottom of the OIDC settings page.

#### ASP.net:

The Redirect URI recommended for this language is:``https://your-domain.com/signin-auth0``

Replace ``your-domain.com`` with your domain name.

<br>  

### Where can I find my Client ID and Client Secret?

The Client ID and Client Secret are used to authenticate the application in our signon system. If you don’t have them,
please contact [support](mailto:it@bcc.no).

**Warning**: The Client Secret should remain confidential! Don’t send it to anybody, and store it in a safe place.

<br>

### I get redirected to a page that says 'Sorry, an error occurred':

Please open developer tools (F12). and look for the ‘Error’ and ‘Error description’ entry in the console (or the query
string parameters of the URL).

Please contact [support](mailto:it@bcc.no). with the logged ‘Error’ and ‘Error description’ entry
