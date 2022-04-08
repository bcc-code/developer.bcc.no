---
title: Address Search
---

# Address search

The TV guide is a widget that shows the upcoming programs on BrunstadTV. It can be implemented on local church websites as a widget.

#### Syntax

````html
<div id="bcc-search"></div>
<script id="script-bcc-search" async="true" data-authentication-type="" data-authentication-location="" data-language=""
        data-hidesearchbox="" data-searchquery="" src="https://widgets.bcc.no/widgets/SearchJs"></script>
````

#### Example

````html
<div id="bcc-search"></div>
<script id="script-bcc-search" data-authentication-type="" data-authentication-location="" data-language="no"
        data-hidesearchbox="false" data-searchquery="John Doe" src="https://widgets.bcc.no/widgets/SearchJs"></script>
````

#### Wordpress Example

````html
[bcc-widgets-search language="no" hidesearchbox="false" searchquery="John Doe"]
````

## Parameters
| Parameter                                                         | Description                                                                                                                                      |
|-------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| ``data-authentication-type`` and ``data-authentication-location`` | Please check the [documentation](#widgets-authentication) on widget authentication.                                                              |
| ``data-language`` (optional)                                      | The language for the calendar to be returned in. If not specified, the language will be set to English                                           |
|                                                                   | **DE** (German), **EN** (English), **FI** (Finnish), **FR** (French), **NO** (Norwegian), **NL** (Dutch), **ES** (Spanish)                       |                                                                                                                                                                                                                     |
| ``data-hidesearchbox `` (optional)                                | Set to **True** to hide the search box so you can use your own search box and send the search string as **q** parameter. Default is **False**.   |
| ``data-searchquery `` (optional)                                  | If you use your own search box, you may send the search string as this parameter. Must be used in combination with the HideSearchBox parameter.  |