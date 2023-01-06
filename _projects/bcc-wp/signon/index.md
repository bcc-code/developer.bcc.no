---
title: Signon Wordpress
description: Technical documentation
---

## Getting started

This tutorial will explain you how to implement BCC Signon on a WordPress website.

### Prerequisites

* You have received your Client ID and Client Secret. (If you haven’t,
  contact [support](mailto:it@bcc.no?subject=Support%Developer%BCC).)

### Quickstart Guide

This a shortened version of the detailed documentation. If you encounter problems, check out the detailed documentation
and [the troubleshooting page](troubleshooting)

1. Download the latest version of the [BCC Login Plugin](https://github.com/bcc-code/bcc-wp/releases/download/bcc-login-v1.1.117/bcc-login.zip).
2. Add `OIDC_CLIENT_ID` and `OIDC_CLIENT_SECRET` as environment variables or constants in `wp-config.php`, using the values supplied by IT support.  
  
   **UPGRADING**: This step can be omitted if you have the old version of the plugin (called *BCC Signon*) already installed.
3. Log in to the admin panel of WordPress.
4. Navigate to **Plugins** → **Add New** → **Upload Plugin**, and find the downloaded file **bcc-login.zip**. Install
   the plugin.
5. Once installed, click on **Activate**.
6. Enable **automatic updates** for the plugin.
7. In the WordPress admin panel, go to **Settings** → **BCC Login** and configure the following
    * **Default Content Access**: Use *Authenticated Users* to limit access to users with a BCC Login Account.
    * **Member Organization**: The name of the relevant church district (e.g. Horten, Salem). This should not be prefixed with BCC or similar.
8. Save Changes
9. If you would like articles from your website to be displayed on BCC Portal, send the Feed Link
   to [support](mailto:it@bcc.no?subject=Support%Developer%BCC).
9. **UPGRADING**: For websites that previously had the old version of the plugin installed (BCC Signon):  
   a. Click **Delete subscribers** in the *Maintenence* section of the plugin settings. This will remove all users that do not have admin or editor access in the system.  
   b. Disable the old version of the plugin (BCC Signon) under **Plugins**.
10. Test that it works: Open an incognito tab and visit your website. Login with OpenID Connect. If you experience any
   errors when testing, please see [the troubleshooting page](troubleshooting).
11. Admin users can be added manually, and the email address of these users should be the same as the email address for BCC Login. This will allow single sign-on to work for these users.
12. If you followed all the steps above, login should now be set up correctly for your WordPress website. The following
    pages contain a more detailed version of the above steps, so you don’t need to read them if everything is working
    for you already.  

---

Next: [Advanced configuration options →](configuration)
