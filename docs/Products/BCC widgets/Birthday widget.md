---
title: Birthdays
---

# Birthdays

The birthday widget shows upcoming birthdays. It can be added on local church websites as a widget. It will not let you
see birthdays from past days, only upcoming. You can specify how many days to display in the widget. The default is
three days, today included.

#### Syntax
````html
<div id="bcc-birthday"></div>
<script id="script-bcc-birthday" async="true" data-authentication-type="" data-authentication-location=""
        data-language="" data-churchname="" data-maxdays="" src="https://widgets.bcc.no/widgets/BirthdayJs"></script>
````
#### Example
````html
<div id="bcc-birthday"></div>
<script id="script-bcc-birthday" async="true" data-authentication-type="" data-authentication-location=""
        data-language="no" data-churchname="østfold" data-maxdays="5"
        src="https://widgets.bcc.no/widgets/BirthdayJs"></script>
````
#### Wordpress Example
````html
<div style="position:relative; width: 300px;">  
    [bcc-widgets-birthday language="no" churchname="østfold" maxdays=5]
</div>
````


## Parameters

| Parameter                                                         | Description                                                                                                                                                                                                                                                                                     |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``data-authentication-type`` and ``data-authentication-location`` | Please check the [documentation](./Widget%20Authentication.md) on widget authentication.                                                                                                                                                                                                             |
| ``data-language`` (optional)                                      | The language for the calendar to be returned in. If not specified, the language will be set to English                                                                                                                                                                                          |
|                                                                   | **DE** (German), **EN** (English), **FI** (Finnish), **FR** (French), **NO** (Norwegian), **NL** (Dutch), **ES** (Spanish)                                                                                                                                                                      |                                                                                                                                                                                                                     |
| ``data-churchname`` (required)                                    | What church to show birthdays from. The value is simply the name of the church. For your own church, the church name can be found on the [profile page](https://members.bcc.no/profile/). Special characters like æ, ø, å, ä, ü and ö are supported. “hessenhöfe” is for example a valid value. |
| ``data-maxdays `` (optional)                                      | Maximum number of days (counted from today) to return. Default is 3 days.                                                                                                                                                                                                                       |

