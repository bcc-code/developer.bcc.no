---
title: Getting User Information
---

By default, the BCC Login plugin does not create new users in wordpress when a user logs in using OpenID Connect.

However, it is still possible to access the OIDC `identity token` and `access token` which can be used for personalizing the website, or making user specific calls to backend APIs. These tokens can be accessed by making an AJAX request to the following endpoints:

* *OIDC Identity Token*: https://[your domain]/?bcc-login=id-token
* *OAuth Access Token*: https://[your domain]/?bcc-login=access-token

These endpoints are used by the BCC Widgets (such as topbar) to create a personalized experience.

To view the contents of these tokens a tool such as  [jwt.io](https://jwt.io) can be used.

---

Next: [Protect Uploaded Files →](protect-uploads-files)
