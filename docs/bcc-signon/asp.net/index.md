---
title: BCC Signon - ASP.NET
description: Technical documentation and guides for software development in BCC
---

## Page Content

---

* [Getting Started](#getting-started)
    * [Limitations](#limitations)
    * [Read more](#read-more)
* [Install nuget packages](#install-nuget-packages)
* [Edit configuration file](#edit-configuration-file)
    * [Get your client IDs](#get-your-client-ids)
    * [Set Callback URLs](#get-your-client-ids)
* [OpenID Connect configuration](#openid-connect-configuration)
* [Add Account controller](#add-account-controller)
* [Force login to enter the website](#force-login-to-enter-the-website)

# Getting started

This tutorial will introduce you to our login solution for ASP.NET Core.

## Limitations

This solution has (for now) some limitations that you have to be aware of. Please read them carefully to avoid any bad
surprise.

* The newsfeed link shared with Brunstad Portal should be protected by
  a [private URL](/docs/bcc-signon/openid-connect#protect-news-feed-and-calendar)
* The ````userAccountId```` attribute of the old system has been
  deprecated [(read more)](/docs/bcc-signon/openid-connect#deprecated-claims).

## Read More

If you want to know more about this solution, you can
read [Auth0’s extended tutorial](https://auth0.com/docs/quickstart/webapp/aspnet-core/01-login).

<br>

---

# Install nuget packages

As suggested by Auth0, we will use
the [OWIN OpenID Connect](https://www.microsoftpressstore.com/articles/article.aspx?p=2473126) middleware. To install
it, type the following command in the Package Manager Console.

````c#
Install-Package Microsoft.Owin.Security.OpenIdConnect
````

To avoid any problems with cookies, we recommend you to install this package.

````c#
Install-Package Kentor.OwinCookieSaver
````

<br>

----

# Edit configuration file

## Get your client IDs

To use the Auth0 solution, you need to get your client IDs. If you don’t have them, please
contact [support](mailto:it@bcc.no?subject=Support%Developer%BCC).

Navigate to your configuration file, and then to the appSettings section. Add these keys:

````js
<add key="auth0:Domain" value="login.bcc.no"/>
<add key="auth0:ClientId" value="YOUR-CLIENT-ID"/>
<add key="auth0:ClientSecret" value="YOUR-CLIENT-SECRET-ID"/>
````

## Set Callback URLs

To complete both login and logout, you need to configure callback URLs.

We recommend you configure them as follows.

* Login Callback: ``https://your-domain.com/signin-auth0``
* Logout Callback: ``https://your-domain.com``

Just replace ``your-domain.com`` with your website’s domain.

Then, go back to your configuration file and add these keys:

````js
<add key="auth0:RedirectUri" value="YOUR-LOGIN-CALLBACK"/>
<add key="auth0:PostLogoutRedirectUri" value="YOUR-LOGOUT-CALLBACK"/>
````

Before continuing, please send your callback URLs to [support](mailto:it@bcc.no?subject=Support%Developer%BCC) so Auth0
can be configured with your website.


<br>

---

# OpenID Connect configuration

**Warning:** make sure that you have updated the [configuration file](#edit-configuration-file). Don’t expect the
solution to work otherwise.

Navigate to the ``Configuration`` method of your ``Startup`` class.

The following code has to be added to the method.

## Auth0 Parameters

Let’s start by defining some parameters.

````c#
// Configure Auth0 parameters
string auth0Domain = ConfigurationManager.AppSettings["auth0:Domain"];
string auth0ClientId = ConfigurationManager.AppSettings["auth0:ClientId"];
string auth0ClientSecret = ConfigurationManager.AppSettings["auth0:ClientSecret"];
string auth0RedirectUri = ConfigurationManager.AppSettings["auth0:RedirectUri"];
string auth0PostLogoutRedirectUri = ConfigurationManager.AppSettings["auth0:PostLogoutRedirectUri"];
This will get the keys defined in the previous article.
````

## Enable Cookie Authentication

Then, let’s enable cookie authentication with our installed package, and set them as the default authentication.

````c#
// Enable Kentor Cookie Saver middleware
app.UseKentorOwinCookieSaver();
// Set Cookies as default authentication type
app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);
app.UseCookieAuthentication(new CookieAuthenticationOptions
{
AuthenticationType = CookieAuthenticationDefaults.AuthenticationType,
LoginPath = new PathString("/Account/Login")
});
````

If you want to use a custom Login URL, you can edit the one set at line 9.

## Auth0 Configuration

````c#
// Configure Auth0 authentication
// Configure Auth0 authentication
app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
{
AuthenticationType = "Auth0",

                Authority = $"https://{auth0Domain}",
                ClientId = auth0ClientId,
                ClientSecret = auth0ClientSecret,
                RedirectUri = auth0RedirectUri,
                PostLogoutRedirectUri = auth0PostLogoutRedirectUri,
                ResponseType = OpenIdConnectResponseType.CodeIdTokenToken,
                // Configure the scope, see: https://developer.bcc.no/docs/single-signon/get-information-about-the-user
                Scope = "openid email profile",
                
                
                TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = "name"
                },
                Notifications = new OpenIdConnectAuthenticationNotifications
                {
                    SecurityTokenValidated = notification =>
                    {
                        notification.AuthenticationTicket.Identity.AddClaim(new Claim("id_token", notification.ProtocolMessage.IdToken));
                        notification.AuthenticationTicket.Identity.AddClaim(new Claim("access_token", notification.ProtocolMessage.AccessToken));
                        return Task.FromResult(0);
                    },
                    RedirectToIdentityProvider = notification =>
                    {
                        if (notification.ProtocolMessage.RequestType == OpenIdConnectRequestType.Authentication)
                        {
                            // Add audience to widgets, only required when using one of the BCC widgets (etc. Topbar). 
                            notification.ProtocolMessage.SetParameter("audience", "https://widgets.brunstad.org");
                        }
                        else if (notification.ProtocolMessage.RequestType == OpenIdConnectRequestType.Logout)
                        {
                            var logoutUri = $"https://{auth0Domain}/v2/logout?client_id={auth0ClientId}";
                            notification.Response.Redirect(logoutUri);
                            notification.HandleResponse();
                        }
                        return Task.FromResult(0);
                    }
                }
            });
````

<br>

---

# Add Account Controller

If you don’t have any ``AccountController``, create one in your ``Controllers`` folder, using this template:

````c#
using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;

namespace MvcApplication.Controllers
{
    public class AccountController : Controller
    {
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            HttpContext.GetOwinContext().Authentication.Challenge(new AuthenticationProperties
                {
                    RedirectUri = returnUrl ?? Url.Action("Index", "Home")
                },
                "Auth0");
            return new HttpUnauthorizedResult();
        }

        // This endpoint should not be called directly (when using Single SignOut), but rather trough the "SignOut" page.
        [Authorize]
        public void EndSession()
        {
            HttpContext.GetOwinContext().Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            HttpContext.GetOwinContext().Authentication.SignOut("Auth0");
        }

        [Authorize]
        public ActionResult SignOut()
        {
            HttpContext.Response.Headers.Add("Content-Security-Policy", "frame-ancestors https://*.bcc.no");
            return View();
        }

        [Authorize]
        [HttpGet]
        public ActionResult AccessToken()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var accesstoken = claimsIdentity?.FindFirst(c => c.Type == "access_token")?.Value;
            return Content(accesstoken);
        }
}
````

**Note:** ``Url.Action("Index", "Home")`` (line 15) may have to be edited according to your naming.

### Single Sign-out

Please install Single Signout on your application ([documentation](/docs/bcc-signon/openid-connect#single-sign-out)).

The ‘endsession’ path for this tutorial is ``/Account/EndSession``

The sign-out path for this tutorial is ``/Account/SignOut``

The ``SignOut`` view should be implemented as described here: [SignOut of BCC Widgets](example.com).

<br>

---

# Force login to enter the website

We can add a global filter to prevent non-logged in users from entering the website.

The shortest way to do it is to add this line to the ``Application_Start()`` method of ``Global.asax``.

````c#
GlobalFilters.Filters.Add(new System.Web.Mvc.AuthorizeAttribute());
````