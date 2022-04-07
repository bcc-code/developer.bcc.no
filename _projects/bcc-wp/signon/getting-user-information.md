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

Where ``ClaimName`` is the name of the claim. All the available claims are documented [here](/docs/bcc-signon/openid-connect#get-information-about-the-user).


---

Next: [How SSO data is handled →](sso-data-handling.md)