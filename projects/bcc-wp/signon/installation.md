---
title: Installing BCC signon on wordpress
description: Technical documentation
---

# Installing BCC Signon on Wordpress

## System Requirements

To get the best experience of our Auth0 Login, we suggest the following:

1. WordPress 4.9 or greater
2. PHP 7.0 or greater
3. MySQL 5.6 or greater OR MariaDB 10 or greater

This documentation assumes you have already installed WordPress. If you do not know how to install WordPress, please
refer to the [official documentation](https://wordpress.org/support/article/how-to-install-wordpress/) of WordPress.

## Prerequisite

Before installing the plugin, make sure your admin user in WordPress does **NOT** have the same email address as the one
you use to log in to Brunstad Portal. If it does, then change it and confirm the new email address for your WordPress
user.

## Installation

1. Download the latest version of [BCC Signon Plugin](/plugins/bcc-signon.zip)
2. Login to the admin panel of WordPress
3. Navigate to **Plugins** → **Add New** → **Upload Plugin**, and find the downloaded file bcc-signon.zip. Install the
   plugin.
4. Once installed, click on **Activate**

## Create a new admin user

Open an incognito window or another browser and go to the administration panel on your WordPress website and log in with
your Brunstad Portal account. This will create a new user in WordPress.

Now use the browser window you used to install the plugin (where you are logged in with Administrator access), go to the
Users tab in the left panel of the WordPress dashboard, find your newly created user and make him an Administrator.

That’s it! Now you can use this user to access the administration dashboard, without any need to fill in credentials.


---

| Back                          | Continue                                                |
|-------------------------------|---------------------------------------------------------|
| [← Getting started](index.md) | [Installing BCC Signon on WordPress →](installation.md) |