---
title: TV Guide
---

# TV guide

The TV guide is a widget that shows the upcoming programs on BrunstadTV. It can be implemented on local church websites as a widget.

#### Syntax

````html
<div id="bcc-tvguide"></div>
<script id="script-bcc-tvguide" async="true" data-authentication-type="" data-authentication-location=""
        data-language="" data-maxdays="" src="https://widgets.bcc.no/widgets/TvGuideJs"></script>
````

#### Example

````html
<div id="bcc-tvguide"></div>
<script id="script-bcc-tvguide" async="true" data-authentication-type="" data-authentication-location=""
        data-language="no" data-maxdays="1" src="https://widgets.bcc.no/widgets/TvGuideJs"></script>
````

#### Wordpress Example

````html
<div style="position:relative; width: 300px;">
    [bcc-widgets-tvguide language="no" maxdays=1]
</div>
````

### Parameters
| Parameter                                                         | Description                                                                                                                                                                                                                          |
|-------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``data-authentication-type`` and ``data-authentication-location`` | Please check the [documentation](#widgets-authentication) on widget authentication.                                                                                                                                                  |
| ``data-language`` (optional)                                      | The language for the calendar to be returned in. If not specified, the language will be set to English                                                                                                                               |
|                                                                   | **DE** (German), **EN** (English), **FI** (Finnish), **FR** (French), **NO** (Norwegian), **NL** (Dutch), **ES** (Spanish)                                                                                                           |                                                                                                                                                                                                                     |
| ``data-maxdays`` (optional)                                       | Maximum number of days (counted from today) to return. Default is 1 day                                                                                                                                                              |
