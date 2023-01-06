---
title: Getting User Information
---

By default, the BCC Login plugin does not create new users in wordpress when a user logs in using OpenID Connect.

However, it is still possible to access the OIDC `identity token` and `access token` which can be used for personalizing the website, or making user specific calls to backend APIs. These tokens can be accessed by making an AJAX request to the following endpoints:

* *OIDC Identity Token*: https://[your domain]/?bcc-login=id-token
* *OAuth Access Token*: https://[your domain]/?bcc-login=access-token

To view the contents of these tokens, visit https://jwt.io.

---

Next: [Protect Uploaded Files →](protect-uploads-files)