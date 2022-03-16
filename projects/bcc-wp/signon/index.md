---
title: Signon Wordpress
description: Technical documentation
---

# Getting started

This tutorial will explain you how to implement BCC Signon on a WordPress website.

## Prerequisites

* You have received your Client ID and Client Secret. (If you haven’t,
  contact [support](mailto:it@bcc.no?subject=Support%Developer%BCC).)
* Your admin user in WordPress does NOT have the same email address as your BCC user. (If it does, then change it and
  confirm the new email address for your WordPress admin user.)

## Quickstart guide

This a shortened version of the detailed documentation. If you encounter problems, check out the detailed documentation
and [the troubleshooting page](#troubleshooting)

1. Download the latest version of the [BCC Signon Plugin](/plugins/bcc-signon.zip).
2. Log in to the admin panel of WordPress.
3. Navigate to **Plugins** → **Add New** → **Upload Plugin**, and find the downloaded file **bcc-signon.zip**. Install
   the plugin.
4. Once installed, click on **Activate**.
5. In the WordPress admin panel, go to **Settings** → **OpenID Connect Client** and configure the following
    * **Login type**: OpenID Connect button on login form
    * **Client ID**: Your client ID
    * **Client Secret Key**: Your client Secret
    * **OpenID Scope**: Your [scopes](/docs/bcc-signon/openid-connect#available-claims). (E.g. email openid profile
      church)
    * **Enable logging**: Uncheck this unless you need logging.
6. Save Changes
7. In the WordPress admin panel, go to **Settings** → **BCC Signon**. Here you may enable the TopBar and a private news
   feed. If you enable Private Newsfeeds, please send the Private newsfeed link
   to [support](mailto:it@bcc.no?subject=Support%Developer%BCC).
8. Save Changes
9. Test that it works: Open an incognito tab and visit your website. Login with OpenID Connect. If you experience any
   errors when testing, please see [the troubleshooting page](#troubleshooting).
10. After having tested the login with your BCC user, go the the WordPress admin panel. Then go to Users. You should see
    a user with your BCC email there. Promote that user to Administrator. You will now be able to access the admin panel
    with your BCC user.
11. Go to the incognito tab where you’re logged in with your BCC user and verify that you have admin rights with that
    user.
12. In the WordPress admin panel, go to **Settings** → **OpenID Connect Client** and change the **Login type** to Auto
    Login – SSO
13. Save Changes
14. If you followed all the steps above, login should now be set up correctly for your WordPress website. The following
    pages contain a more detailed version of the above steps, so you don’t need to read them if everything is working
    for you already.

**NOTE**: If you experience that users have access to a limited dashboard and toolbar, please
see [this page](#disable-dashboard-and-toolbar).

---

Next: [Installing BCC Signon on WordPress →](installation.md)