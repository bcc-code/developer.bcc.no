---
title: Troubleshooting
description: Documentation about creating WordPress sites with BCC widgets and plugins
---

# Troubleshooting 

If you get redirected to a page that says “Sorry, an error occurred”, please look at the url. It
contains an ‘error description’ parameter. Sometimes, the error can’t be solved by you. The two most common cases are

* **Callback URL mismatch. example.com/callback is not in the list of allowed callback URLs:** Contact [support](it@bcc.no?subject=Support%Developer%BCC) and ask them to
add the specified callback URL to your client. 
* **Grant type ‘authorization_code’ not allowed for the client:** Contact [support](it@bcc.no?subject=Support%Developer%BCC) and ask them to allow the specified grant type for your client.'

If you get the error: “Failed user creation”
when logging in with OpenID Connect, you most likely have an existing WordPress user with the same email address as your
BCC user, but with a username that is not your BCC person ID. In that case, either change the email address of the
existing WordPress user or remove the WordPress user. After that you should no longer get the error.