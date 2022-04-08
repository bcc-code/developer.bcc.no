---
title: Protect Uploads files
---

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

2. Append the following lines to your .htaccess
````
RewriteCond %{REQUEST_FILENAME} -s
RewriteRule ^wp-content/uploads/(.*)$ dl-file.php?file=$1 [QSA,L]
````

---

Next: [Troubleshooting](troubleshooting.md)