---
title: Calendar
description: Here you’ll find the documentation for the “new” widgets. They are also known as widgets.bcc.no (as opposed to the old widgets: widgets.brunstad.org).
---

# Calendar – widget

## Page Contents

* [Calendar - integration](integration#calendar---integration)
* [Week calendar](#week-calendar)
* [Month calendar](#month-calendar)

---

## Implement the Brunstad Portal calendar on your website

The calendars shown on Brunstad Portal can be implemented on local church websites as widgets. If you share your
calendar with Brunstad Portal, you can make a widget that shows e.g. your church calendar and the Brunstad calendar.

## Week calendar
The script tag of the week calendar looks like this:

#### Syntax
````html
<div style="position:relative; width:300px;">
    <div id="bcc-calendar-week"></div>
</div>
<script id="script-bcc-calendar-week" async="true" data-authentication-type="" data-authentication-location=""
        data-language="" data-maxdays="" data-maxappointments="" data-calendars="" data-fullcalendarurl=""
        src="https://widgets.bcc.no/widgets/CalendarWeekJs"></script>
````

#### Example
````html
<div style="position:relative; width:300px;">
    <div id="bcc-calendar-week"></div>
</div>
<script id="script-bcc-calendar-week" async="true" data-authentication-type="" data-authentication-location=""
        data-language="no" data-maxdays="15" data-maxappointments="30"
        data-calendars="brunstad_calendar_no,tonsberg_calenda" data-fullcalendarurl="/kalendar.aspx"
        src="https://widgets.bcc.no/widgets/CalendarWeekJs"></script>
````
#### Wordpress Example
````html
<div style="position:relative; width: 300px;">
    [bcc-widgets-week-calendar language="no" maxdays=15
    calendars="brunstad_calendar_no" fullcalendarurl="/kalendar" maxappointments=30]
</div>
````

### Parameters
| Parameter                                                         | Description                                                                                                                                                                                                                                                                       |
|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``data-authentication-type`` and ``data-authentication-location`` | Please check the [documentation](#widgets-authentication) on widget authentication.                                                                                                                                                                                               |
| ``data-calendars`` (required)                                     | Comma separated list of ids to the calendars that should be returned. **This parameter must be specified**. Each local church church has an id like _tonsberg_calendar_, and Brunstad has one calendar named _brunstad_calendar_no_.                                              |
| ``data-language`` (optional)                                      | The language for the calendar to be returned in. If not specified, the language will be set to English                                                                                                                                                                            |
|                                                                   | **DE** (German), **EN** (English), **FI** (Finnish), **FR** (French), **NO** (Norwegian), **NL** (Dutch), **ES** (Spanish)                                                                                                                                                        |                                                                                                                                                                                                                     |
| ``data-fullcalendarurl`` (optional)                               | If specified, a button with a link to this URL and with a text like “Show full calendar” (depending on culture selection) will be shown in the bottom of the week calendar. This should contain a link to the month calendar. For the month calendar, it should not be specified. |
| ``data-maxdays`` (optional)                                       | Maximum number of days (counted from today) to return. Only applicable to the week calendar. Default is 7 days.                                                                                                                                                                   |
| ``data-maxappointments`` (optional)                               | Maximum number of appointments to return. Only applicable to the week calendar. Default is all appointments within the specified days.                                                                                                                                            |

## Month calendar
The script tag of the month calendar looks like this:

#### Syntax

````html

<div style="width: 100%;">
    <div id="bcc-calendar-month"></div>
</div>
<script id="script-bcc-calendar-month" async="true" data-authentication-type="" data-authentication-location=""
        data-language="" data-calendars="" src="https://widgets.bcc.no/widgets/CalendarMonthJs"></script>
````

#### Example

````html

<div style="width: 100%;">
    <div id="bcc-calendar-month"></div>
</div>
<script id="script-bcc-calendar-month" async="true" data-authentication-type="" data-authentication-location=""
        data-language="no" data-calendars="brunstad_calendar_no"
        src="https://widgets.bcc.no/widgets/CalendarMonthJs"></script>
````

#### Wordpress Example

````html

<div style="width: 100%">
    [bcc-widgets-month-calendar language="no" calendars="brunstad_calendar_no"]
</div>
````

### Parameters
| Parameter                                                         | Description                                                                                                                                                                                                                                                                       |
|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``data-authentication-type`` and ``data-authentication-location`` | Please check the [documentation](#widgets-authentication) on widget authentication.                                                                                                                                                                                               |
| ``data-calendars`` (required)                                     | Comma separated list of ids to the calendars that should be returned. **This parameter must be specified**. Each local church church has an id like _tonsberg_calendar_, and Brunstad has one calendar named _brunstad_calendar_no_.                                              |
| ``data-language`` (optional)                                      | The language for the calendar to be returned in. If not specified, the language will be set to English                                                                                                                                                                            |
|                                                                   | **DE** (German), **EN** (English), **FI** (Finnish), **FR** (French), **NO** (Norwegian), **NL** (Dutch), **ES** (Spanish)                                                                                                                                                        |                                                                                                                                                                                                                     |
