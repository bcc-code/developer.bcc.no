---
title: BCC Signon - ASP.NET Core 
description: Technical documentation and guides for software development in BCC
---

## Page Content

---

* [Getting Started](#getting-started)
    * [Limitations](#limitations)
    * [Read more](#read-more)
* [Install nuget packages](#install-nuget-packages)
* [Edit configuration file](#edit-configuration-file)
    * [Get your application credentials](#get-your-application-credentials)
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

We need to install packages for the Cookies and OpenID Connect. To do that, type the following commands in the Package
Manager Console.

````c#
Install-Package Microsoft.AspNetCore.Authentication.Cookies
Install-Package Microsoft.AspNetCore.Authentication.OpenIdConnect
````

<br>

----

# Edit configuration file

## Get your application credentials

To use the Auth0 solution, you need to get your client credentials If you don’t have them, please
contact [support](mailto:it@bcc.no?subject=Support%Developer%BCC).

Navigate to your ````appsettings.json```` file. Add these parameters

````c#
"Auth0": {
    "Domain": "login.bcc.no",
    "ClientId": "YOUR-CLIENT-ID",
    "ClientSecret": "YOUR-CLIENT-SECRET",
  }
````

<br>

---

# OpenID Connect configuration

## Warning: make sure that you have updated the [configuration file](example.com). Don’t expect the solution to work otherwise.

Navigate to the ````ConfigureServices ```` method of your Startup class.

Add this code to the method.

````c#
public void ConfigureServices(IServiceCollection services)
        {
            // Add authentication services
            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie()
            .AddOpenIdConnect("Auth0", options => {
                // Set the authority to your Auth0 domain
                options.Authority = $"https://{Configuration["Auth0:Domain"]}";

                // Configure the Auth0 Client ID and Client Secret
                options.ClientId = Configuration["Auth0:ClientId"];
                options.ClientSecret = Configuration["Auth0:ClientSecret"];

                // Set response type to code
                options.ResponseType = "code";


                // Configure the scope, see: https://developer.bcc.no/docs/single-signon/get-information-about-the-user
                options.Scope.Clear();
                options.Scope.Add("openid");
                options.Scope.Add("email");


                // Set the callback path, so Auth0 will call back to http://localhost:5000/signin-auth0 
                // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard 
                options.CallbackPath = new PathString("/signin-auth0");

                // Configure the Claims Issuer to be Auth0
                options.ClaimsIssuer = "Auth0";

                // Saves tokens to the AuthenticationProperties
                options.SaveTokens = true;

                options.Events = new OpenIdConnectEvents
                {
                    OnRedirectToIdentityProvider = context =>
                    {
                        context.ProtocolMessage.SetParameter("audience", "https://widgets.brunstad.org");
                        return Task.FromResult(0);
                    },
                    // handle the logout redirection 
                    OnRedirectToIdentityProviderForSignOut = (context) =>
                    {
                        var logoutUri = $"https://{Configuration["Auth0:Domain"]}/v2/logout";
                        context.Response.Redirect(logoutUri);
                        context.HandleResponse();
                        return Task.CompletedTask;
                    }
                };   
            });

        }
````

Then, navigate to the ````Configure```` method and add these lines

````c#
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
````

## Register callbackURL

##### Before continuing, please send your callback URLs to [support](mailto:it@bcc.no?subject=Support%Developer%BCC) so Auth0 can be configured with your website

Callback URL:: ````https://your-domain.com/signin-auth0```` (replace ````your-domain.com```` with your website’s domain)

<br>

---

# Add Account controller

If you don't have any ````AccountController````, create one in your ``Controllers`` folder, using this template:

````c#
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace SampleMvcApp.Controllers
{
    public class AccountController : Controller
    {
        [AllowAnonymous]
        public async Task Login(string returnUrl = "/")
        {
            await HttpContext.ChallengeAsync("Auth0", new AuthenticationProperties() { RedirectUri = returnUrl });
        }

        // This endpoint should not be called directly when using a BCC Widget(e.g. topbar), but rather trough the "singleSignout" page.
        [Authorize]
        public async Task EndSession()
        {
            await HttpContext.SignOutAsync("Auth0");
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [Authorize]
        public ActionResult SignOut()
        {
            HttpContext.Response.Headers.Add("Content-Security-Policy", "frame-ancestors https://*.bcc.no");
            return View();
        }

        [Authorize]
        [HttpGet]
        public async Task AccessToken()
        {
            var accesstoken = await HttpContext.GetTokenAsync("access_token");
            return Ok(accesstoken);
        }
    }
}
````

### Single Signout

Please install Single Signout on your application ([documentation](example.com)).

The ‘endsession’ path for this tutorial is ``/Account/EndSession``

The ‘signout’ path for this tutorial is ``/Account/SignOut``

The ``SignOut`` view should be implemented as described here: [Signout of BCC Widgets.](example.com)

<br>

---

# Force login to enter the website

We can add a global filter to prevent non-logged in users from entering the website.

To do it, edit the declaration of the Mvc, in the ``ConfigureServices`` method.

`````c#
services.AddMvc(options =>
    {
        options.Filters.Add(new AuthorizeFilter(new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build()));
    })
`````

Don’t forget then to mark your login method with ``[AllowAnonymous]``, like that:

````c#
[AllowAnonymous]
public async Task Login(string returnUrl = "/")
{   
    await HttpContext.ChallengeAsync("Auth0", new AuthenticationProperties() { RedirectUri = returnUrl });
}
````

