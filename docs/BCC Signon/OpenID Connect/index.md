---
title: BCC Signon - OpenID Connect
description: Technical documentation and guides for software development in BCC
---

# Page Content

* [Getting Started](#getting-started)
    * [Our Strategy](#our-strategy)
    * [Supported Languages and CMS](#supported-languages-and-cms)
    * [Using SignOn with other languages/CMS’s](#using-signon-with-other-languagescmss)
* [Get information about the user](#get-information-about-the-user)
    * [Available claims](#available-claims)
    * [Deprecated claims](#deprecated-claims)
    * [ID_token example](#id_token-example)

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
* The user can easily sign-out of all BCC applications.

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

# Get information about the user

It is possible to get additional information about the logged-in user, with the use of claims. Claims are statements (
such as name or email address) about the user.

## How to request claims

Claims can be requested via the scope parameter in the authentication request to BCC Signon. The claims will be present
in the response of the authentication request.
  
  ### Articles
  * [Available claims](#available-claims)
  * [Deprecated claims](#deprecated-claims)
  * [ID_token example](#id_token-example)

---

# Available claims

Please keep the requested claims down to the minimal required. You can always ask for additional claims later, when the
application needs them.

## Standard OpenID Connect claims

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

## Additional claims of BCC Signon

It’s currently possible to request all available claims. Your application may require additional approval of BCC in the
future, before you have access to additional claims of the user (the claims of the ‘openid’ scope will always be
available).

## _‘openid’_ scope

| Claim name:                               | Content:                                                                                         |
|-------------------------------------------|--------------------------------------------------------------------------------------------------|
| https://login.bcc.no/claims/personId      | The primary identifier of the user in the BCC membership system (this value will never change).  |
| https://login.bcc.no/claims/hasMembership | Shows if the user has an active membership in BCC                                                |

## _‘church’_ scope

| Claim name:                            | Content:                      |
|----------------------------------------|-------------------------------|
| https://login.bcc.no/claims/churchId   | The identifier of the church  |
| https://login.bcc.no/claims/churchName | The name of the church        |

## _‘country’_ scope

| Claim name:                                  | Content:                                                                                   |
|----------------------------------------------|--------------------------------------------------------------------------------------------|
| https://login.bcc.no/claims/CountryIso2Code  | The [countryCode](https://no.wikipedia.org/wiki/ISO_3166-1_alfa-2) of the user his church  |

# Deprecated claims

These claims have been deprecated, and their use is strongly discouraged. Please contact support if your application is
dependent on theses claims.

| Claim name:                          | Content:                                                |
|--------------------------------------|---------------------------------------------------------|
| https://members.bcc.no/app_metadata  | Please use the claims of the additional “openid” scope  |

## _‘deprecatedSignonUsername’_ scope

| Claim name:                                          | Content:                                                         |
|------------------------------------------------------|------------------------------------------------------------------|
| https://login.bcc.no/claims/deprecatedSignonUsername | The username of the user that was used in the old signon system  | 

# id_token example

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
