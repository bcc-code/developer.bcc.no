---
title: BCC Widgets
description: Documentation on using BCC Widgets on WordPress
---

# BCC Widgets

## Articles
* [Topbar]()
* [Calendar]()
* [TV Guide]()
* [Address Search]()
* [News]()
* [Birthdays]()

Here you’ll find the documentation for the “new” widgets. They are also known as widgets.bcc.no (as opposed to the old
widgets: widgets.brunstad.org).

## Widgets Authentication

All BCC widgets require access to the ``access_token`` of the end-user. This makes it possible to personalize the widget for
the end-user that is visiting your application.

(The ``access_token`` gets returned from the sign-on system when the user logs in).

Please use the following articles to configure authentication of widgets:

### Configuration
#### Regular web application
The session of the user is stored server-side (with the use of cookies), e.g. ASP.NET, ASP.NET Core, PHP etc.

The application should have an endpoint that returns the access_token to the browser of the end-user.

1. Set the audience property to https://widgets.brunstad.org
   * Located in the OpenID Configuration (see ASP.NET Core Tutorial for an example) .
2. Create an endpoint that returns the access_token of the end-user (see ASP.NET Core Tutorial for an example).
   * The access_token should be able to be requested from browser (based on the cookie of the user).
3. Set the data-authentication-type attribute in the Widgets script tag to “WebApp”

Set the data-authentication-location attribute in the Widgets script tag to the path of the endpoint from step 2

#### Example
````html
<!-- topbar widget -->
<script id="script-bcc-..." data-authentication-type="WebApp" data-authentication-location="/Account/accesstoken"
        src="https://widgets.bcc.no/widgets/TopbarJs"></script>
<!-- end topbar widget -->
````

##### Alternative Approach

**Note:** This option is intended as a fallback for option 1, if your application cannot implement option 1.

This option can be used by applications that use server-side rendering (e.g. with most traditional applications).

Configure the top bar for ‘inline access_token’:

1. Set the ``data-authentication-type`` attribute to ``"inline-access-token"``
2. Remove the ``data-authentication-location`` attribute
3. Request an access_token for the Widgets API, by setting the ``audience`` to ``https://widgets.brunstad.org`` ([see ASP.NET
   Core Tutorial for an example](docs/bcc-signon/asp.net-core/#edit-configuration-file)). 
4. Add the data-access-token attribute with the access_token of the end-user
````html
<!-- topbar widget -->
<script id="script-bcc-..." data-authentication-type="inline-access-token" data-access-token="ACCESS_TOKEN OF END USER"
        src="https://widgets.bcc.no/widgets/TopbarJs"></script>
<!-- end topbar widget -->
````

### Single Page Application
The session of the user is stored in the browser of the user, e.g. Angular, React, etc.

The application should provide the path of the access token.

Set the data-authentication-type attribute to “SPA”
Set the data-authentication-location attribute to the path in LocalStorage. this also supports a nested JSON object in the value of the LocalStorage entry (e.g. oidc.accesstoken).
#### Example
<!-- topbar widget -->
<script id="script-bcc-topbar" data-authentication-type="SPA" data-authentication-location="oidc.accesstoken"
        src="https://widgets.bcc.no/widgets/TopbarJs"></script>
<!-- end topbar widget -->
## Signout
BCC Widgets uses LocalStorage of your application to store (and cache) values. The storage of BCC widgets can be cleared by loading the following HTML page:
````html
<!DOCTYPE html>

<html>
<head>
    <title>signout</title>
</head>
<body>

<div>
    <script src="https://widgets.bcc.no/widgets/signoutjs"></script>
    <script>
        window.location = "path to clear session"
    </script>
</div>
</body>
</html>
````
**Path to clear session**: The user gets redirected to this location after widgets has been signed out.

---

Next: [Topbar](topbar.md)

