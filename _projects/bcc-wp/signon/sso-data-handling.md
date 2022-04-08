---
title: How SSO data is handled
---

# How SSO data is handled 

_This article will describe how BCC distributes the BCC members personal data through it’s
central login system called “BCC Login”_

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

---

Next: [Protect Uploads files](protect-uploads-files.md)