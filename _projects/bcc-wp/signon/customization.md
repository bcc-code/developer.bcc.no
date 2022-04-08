---
title: Plugin Customization
---

# Plugin Customization

## Hooks

This plugin provides a number of hooks to allow for a significant amount of customization of the plugin operations from
elsewhere in the WordPress system ([official documentation](https://github.com/oidc-wp/openid-connect-generic#user-meta-data)).

You can whitelist some custom URLs by using the bcc_unprotected_urls hook:

````js
add_filter('bcc_unprotected_urls', function () {
    return array("https://example.com/custom-url");
});
````

Whitelisted URLs will be accessible without being authenticated with BCC Signon

## Actions

WordPress actions are generic events that other plugins can react to. You’ll probably only ever want to use ``add_action``
when hooking into this plugin ([official documentation](https://github.com/oidc-wp/openid-connect-generic#actions)).

You can use the openid-connect-generic-update-user-using-current-claim action to add WordPress roles to the user, based
on [signon claims](getting-user-information.md).

## User Meta Data

This plugin stores meta data about the user for both practical and debugging purposes ([official documentation](https://github.com/oidc-wp/openid-connect-generic#user-meta-data)).

---

Next: [Getting User Information →](getting-user-information.md)