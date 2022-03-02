---
title: BCC Signon - ASP.NET
description: Technical documentation and guides for software development in BCC
---

## Page Content

---

* [Getting Started](#getting-started)
* [Installing BCC Signon on Wordpress](#installing-bcc-signon-on-wordpress)
* [Plugin configuration](#plugin-configuration)
* [Plugin customization](#plugin-customization)
* [Get information about the user](#get-information-about-the-user)
* [How SSO data is handled](#how-sso-data-is-handled)
* [Protect Uploads files](#protect-uploads-files)
* [Troubleshooting](#troubleshooting)

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

# Plugin configuration

The settings of **BCC Signon** are grouped into two panels:

* OpenId Connect Client (OIDC Settings) contains all the settings related to the login of users.
* BCC Signon (BCC Settings) contains all the setttings related to BCC’s widgets: newsfeeds, topbar

## OpenId Connect Client Settings

Most of the fields are pre-filled according to BCC’s configuration.

However, there are some settings you’ll have to configure:

### Login Type

OpenID Connect button on login form – is set by default. Keep it this way while setting up/testing the plugin.

Auto Login – SSO will redirect automatically the users to Auth0 login page.  
**Note:** Activate this only when the plugin is ready to be launched on production.

### Client ID & Client Secret Key

Fill in your Client ID and Client Secret Key. If you have not received these, please
contact [support](mailto:it@bcc.no?subject=Support%Developer%BCC).

### OpenID Scope

Here you can request different scopes. More information is
available [here](/docs/bcc-signon/openid-connect#available-claims).

### Enforce Privacy

With this setting you can decide whether the website will request authentication or not. In most of the cases this
should be set to on and the **Unprotected URLs** field can be used to skip the privacy for one or more URLs.

### Protected URLs / Unprotected URLs

This text field allows you to add / skip privacy for defined URLs. Regular expressions can very well be used as well.
Example: if you want to add / skip privacy for all the articles which are under the category ‘local’, you would use
“/local/”.

### Enable Logging

A logger is available; it’s recommended to only use this for testing purposes since it uses the ``wp_options`` table to
store the logs.

## BCC Signon Settings

### BCC Signon URL

This is BCC’s base URL for the authentication domain; this setting is pre-filled, you don’t need to change it.

### Enable private newsfeed

If you want to integrate your website to BCC’s news feed widget, please enable this setting.

Otherwise, you can turn it off.

### Private newsfeed link

If you have enabled the private newsfeed, the RSS feed will be available at this URL. Please share this URL with BCC IT
by contacting [support](mailto:it@bcc.no?subject=Support%Developer%BCC).

### Enable TopBar

This enables BCC’s new top bar widget, that you already see on this website.

If you enable this, you can delete the old top bar script tag (See
the [documentation of the old top bar](/docs/widgets/legacy-discontinued#old-topbar))

### Local church

If you want to identify the users which log in to your website by church, e.g. for displaying specific content or give
access to some pages just to members from your local church, find the church name in the list below and type it in in
the text field on the BCC Login Settings page. If the church you’re coming from is not in the list you can contact
[support](mailto:it@bcc.no?subject=Support%Developer%BCC).

* **Argentina**
    * Paso Flores
    * Villa Regina
* **Australia**
    * Melbourne
    * Sydney
* **Austria**
    * Graz
    * Mittewald
    * Raumberg
    * Wien
* **Brasil**
    * Novo Sarandi
    * Para
* **Cameroon**
    * Bafoussam
    * Douala
    * Yaoundé
* **Canada**
    * Ottawa
    * Toronto
    * Vancouver
    * Winnipeg
* **Chile**
    * Curico
    * Valdivia
* **China**
    * Shanghai
    * Shenzhen
    * Singapore
* **Congo**
    * Congo
* **Denmark**
    * Holstebro
    * København
* **England**
    * Didcot
    * Huntworth
* **Finland**
    * Kyrkslätt
    * Lahti
* **France**
    * Nancy
    * Paris
    * Steinseltz
* **Germany**
    * Dürrmenz
    * Exter
    * Fulda
    * Hamburg
    * Hessenhöfe
    * Lilienhof
    * Linnenbach
    * Maubach
    * Waldhausen
    * Waltrop
* **Hong Kong**
    * Hong Kong
* **Hungary**
    * Vácduka
* **India**
    * Alwaye
    * Bangalore
    * Coimbatore
    * Goa
    * Langtore
    * Mumbai
    * Pune
    * Trivandrum
* **Italy**
    * Catania
    * Sardinia
* **Kenya**
    * Kisii
    * Kisumu
    * Nyakweri
    * Rodi
    * Kopany
* **Mexico**
    * Leon
* **Netherlands**
    * Flevoland
    * Groningen
    * Rotterdam
    * Schermer
    * Terwolde
    * Twente
    * Utrecht
    * Zeeland-Belgie
* **New Zealand**
    * New Zealand
* **Norway**
    * A-lag Brunstad
    * Bergen
    * Brunstad
    * Drammen
    * Eiker
    * Grenland
    * Hallingdal
    * Hamar
    * Harstad
    * Horten
    * Hønefoss
    * Molde
    * Måløy
    * Oslo/Follo
    * Sandefjord
    * Stavanger
    * Stord
    * Sørlandet
    * Tønsberg
    * Valdres
    * Østfold
* **Peru**
    * Ilo
* **Poland**
    * Malinka
    * Wroclaw
* **Romania**
    * Adjud
    * Brasov
    * Bucharest
    * Caragiale
    * Crasna
    * Giurgiu
* **Russia**
    * Central Russia
    * St. Petersburg
* **South Africa**
    * Pretoria
    * Vanderbijlpark
* **Spain**
    * Mallorca
* **Sri Lanka**
    * Colombo
* **Switzerland**
    * Schweiz
* **Turkey**
    * Istanbul
* **Ukraine**
    * Beljaevka
    * Ozornoe
    * Ternopol
    * Zakarpattia
* **United Arab Emirates**
    * Dubai
* **USA**
    * Connecticut
    * Delaware
    * Detroit
    * Missoula
    * Missouri
    * Salem
    * Seattle
    * Syracuse
    * Urbana
* **(no country)**
    * A-lag MOBILT

# Plugin customization

## Hooks

This plugin provides a number of hooks to allow for a significant amount of customization of the plugin operations from
elsewhere in the WordPress system (official documentation).

You can whitelist some custom URLs by using the bcc_unprotected_urls hook:

````js
add_filter('bcc_unprotected_urls', function () {
    return array("https://example.com/custom-url");
});
````

Whitelisted URLs will be accessible without being authenticated with BCC Signon

## Actions

WordPress actions are generic events that other plugins can react to. You’ll probably only ever want to use
``add_action`` when hooking into this
plugin ([official documentation](https://github.com/oidc-wp/openid-connect-generic#actions)).

You can use the openid-connect-generic-update-user-using-current-claim action to add WordPress roles to the user, based
on [signon claims](/docs/bcc-signon/openid-connect#get-information-about-the-user).

## User Meta Data

This plugin stores meta data about the user for both practical and debugging
purposes ([official documentation](https://github.com/oidc-wp/openid-connect-generic#user-meta-data)).

# Get information about the user

You can easily get information about the logged in user by using this method.

````js
function getUserAttribute() {
    $user_id = get_current_user_id();
    $claims = get_user_meta($user_id, 'openid-connect-generic-last-user-claim', true);
    $attribute = '';
    if (!empty($claims)) {
        $attribute = $claims['ClaimName'];
    }
    return $attribute;
}
````

Where ``ClaimName`` is the name of the claim. All the available claims are
documented [here](/docs/bcc-signon/openid-connect#get-information-about-the-user).

# How SSO data is handled

_This article will describe how BCC distributes the BCC members personal data through it’s central login system called
“BCC Login”_

When a user logs in to a 3rd party website (from here-on called “website”) that is protected by BCC login, BCC login
exchanges personal information about that user to the website, e.g. “display name”, “email”, “personId” etc.

Exactly what information is exchanged with the website is based on the request from the website, e.i. the website can
specify during the login process what information it requires. Once the BCC login has exchanged this information with
the website it loses control over the data which means that the website takes over the responsibility for what happens
with this information in the future.

To get a bit more control over the above mentioned process, BCC has developed a plugin that can be installed in the
website to manage this data.

If we take a specific case, for example with WordPress, then a WordPress website would install the BCC login plugin into
their site and configure BCC login to work together with their site. When a user then logs in, the plugin then saves the
user data to the WordPress database permanently, in order to create a session for the user. It is a known requirement to
make this step configurable i.e. that the user can log in with BCC login but his data is never saved to the website, but
as of today this has not yet been implemented.

# Protect Uploads files

We have been notified that uploaded files on WordPress were not protected with BCC Signon, allowing a direct access
using the file’s URL. This is true for all WordPress websites, also those protected by WordPress’s login system.

However, we are aware that this can be an issue for you local church website. Here will be described a way to prevent
unprotected access to your uploads; this may be integrated to BCC’s Signon plugin in the future, but we want to get your
feedback first to ensure it fits all of your configurations.

**This has been tested on a Linux server running Apache 2.4.18 and WordPress 5.2.3: please contact us if this isn’t
working seamlessly for you.**

1. Add the following file as ``dl-file.php`` to your WordPress root folder.

````html
<?php
/*
 * dl-file.php
 *
 * Protect uploaded files with login.
 *
 * @link http://wordpress.stackexchange.com/questions/37144/protect-wordpress-uploads-if-user-is-not-logged-in
 *
 * @author hakre <http://hakre.wordpress.com/>
* @license GPL-3.0+
* @registry SPDX
*/

require_once('wp-load.php');
require_once ABSPATH . WPINC . '/formatting.php';
require_once ABSPATH . WPINC . '/capabilities.php';
require_once ABSPATH . WPINC . '/user.php';
require_once ABSPATH . WPINC . '/meta.php';
require_once ABSPATH . WPINC . '/post.php';
require_once ABSPATH . WPINC . '/pluggable.php';
wp_cookie_constants();
ob_end_clean();
ob_end_flush();

is_user_logged_in() ||  auth_redirect();

list($basedir) = array_values(array_intersect_key(wp_upload_dir(), array('basedir' => 1)))+array(NULL);

$file =  rtrim($basedir,'/').'/'.str_replace('..', '', isset($_GET[ 'file' ])?$_GET[ 'file' ]:'');

if (!$basedir || !is_file($file)) {
status_header(404);
wp_redirect(home_url());
exit();
}

$mime = wp_check_filetype($file);
if( false === $mime[ 'type' ] && function_exists( 'mime_content_type' ) )
$mime[ 'type' ] = mime_content_type( $file );

if( $mime[ 'type' ] )
$mimetype = $mime[ 'type' ];
else
$mimetype = 'image/' . substr( $file, strrpos( $file, '.' ) + 1 );

header( 'Content-Type: ' . $mimetype ); // always send this
if ( false === strpos( $_SERVER['SERVER_SOFTWARE'], 'Microsoft-IIS' ) )
header( 'Content-Length: ' . filesize( $file ) );

$last_modified = gmdate( 'D, d M Y H:i:s', filemtime( $file ) );
$etag = '"' . md5( $last_modified ) . '"';
header( "Last-Modified: $last_modified GMT" );
header( 'ETag: ' . $etag );
header( 'Expires: ' . gmdate( 'D, d M Y H:i:s', time() + 1800 ) . ' GMT' );

// Support for Conditional GET
$client_etag = isset( $_SERVER['HTTP_IF_NONE_MATCH'] ) ? stripslashes( $_SERVER['HTTP_IF_NONE_MATCH'] ) : false;

if( ! isset( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) )
$_SERVER['HTTP_IF_MODIFIED_SINCE'] = false;

$client_last_modified = trim( $_SERVER['HTTP_IF_MODIFIED_SINCE'] );
// If string is empty, return 0. If not, attempt to parse into a timestamp
$client_modified_timestamp = $client_last_modified ? strtotime( $client_last_modified ) : 0;

// Make a timestamp for our most recent modification...
$modified_timestamp = strtotime($last_modified);

if ( ( $client_last_modified && $client_etag )
? ( ( $client_modified_timestamp >= $modified_timestamp) && ( $client_etag == $etag ) )
: ( ( $client_modified_timestamp >= $modified_timestamp) || ( $client_etag == $etag ) )
) {
status_header( 304 );
exit;
}

// If we made it this far, just serve the file
readfile( $file );
````

2. Append the following lines to your .htaccess.

````html
RewriteCond %{REQUEST_FILENAME} -s
RewriteRule ^wp-content/uploads/(.*)$ dl-file.php?file=$1 [QSA,L]
````

# Troubleshooting

If you get redirected to a page that says “Sorry, an error occurred”, please look at the url. It contains an ‘error
description’ parameter. Sometimes, the error can’t be solved by you. The two most common cases are

* **Callback URL mismatch. example.com/callback is not in the list of allowed callback URLs**:
  Contact [support](mailto:it@bcc.no?subject=Support%Developer%BCC) and ask them to add the specified callback URL to
  your client.
* **Grant type ‘authorization_code’ not allowed for the client**:
  Contact [support](mailto:it@bcc.no?subject=Support%Developer%BCC) and ask them to allow the specified grant type for
  your client.

If you get the error: “Failed user creation” when logging in with OpenID Connect, you most likely have an existing
WordPress user with the same email address as your BCC user, but with a username that is not your BCC person ID. In that
case, either change the email address of the existing WordPress user or remove the WordPress user. After that you should
no longer get the error.