---
title: BCC Widgets - Topbar
description: Documentation on using BCC Widgets on WordPress
---

# Topbar

The topbar widget can be included at the top of a web page to provide:

* Links to central websites (BMM, Brunstad TV, YEP…)
* Links to local churches
* Show personalized information of the user (e.g. display the name of the user)
* Logout function

## Install the topbar
##### WordPress applications that have the ``BCC Signon`` plugin installed should not follow this tutorial (the topbar is already included in the plugin).

Make sure you include this styling in your ``<head>`` tag:
````html
<!-- stylesheet link (common for all widgets) -->
<link href="https://widgets.bcc.no/styles/widgets.css" rel="stylesheet" type="text/css">
<!-- end stylesheet link -->
````
Include the following just after <body>:
````html
<!-- topbar widget -->
<script id="script-bcc-topbar" data-authentication-type="TYPE" data-authentication-location="LOCATION"
        src="https://widgets.bcc.no/widgets/TopbarJs" data-app-title="" data-app-url=""></script>
<!-- end topbar widget -->
````
Inside of the data-app-title attribute you can add the title of the application and in data-app-url, the url of the website you want to point to. That can, for example, be:

data-app-title="BCC Developer" data-app-url="https://developer.bcc.no"

## Configuration:

Please check the [widgets authentication](index.md).

---

Next: [Calendar](calendar.md)

