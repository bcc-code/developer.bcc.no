---
title: BCC Widgets
description: Here you’ll find the documentation for the “new” widgets. They are also known as widgets.bcc.no (as opposed to the old widgets - widgets.brunstad.org).
---

## Page Contents

---

* [Widget authentication](#widgets-authentication)
    * [Configuration](#configuration)
    * [Signout](#signout)
* [Topbar](#topbar)
* [Calendar - integration](#calendar---integration)
    * [Link to share with Brunstad](#link-to-share-with-brunstad)
    * [ICalendar Feed Format](#icalendar-feed-format)
    * [ICalendar Feed Example](#icalendar-feed-example)
    * [Developer Tips](#developer-tips)
* [Calendar - widget](#calendar--widget)
    * [Week calendar](#week-calendar)
    * [Month calendar](#month-calendar)
* [TV Guide](#tv-guide)
* [Address search](#address-search)
* [News](#news)
    * [RSS Link to be shared with Brunstad](#rss-link-to-be-shared-with-brunstad)
    * [RSS Format](#rss-format)
    * [RSS Example](#rss-example)
    * [Modify the properties of your feed](#modify-the-properties-of-your-feed)
    * [Developer Tips](#developer-tips)
* [Birthdays](#birthdays)

# Widgets Authentication

All BCC widgets require access to the ``access_token`` of the end-user. This makes it possible to personalize the widget
for the end-user that is visiting your application.

(The ``access_token`` gets returned from the sign-on system when the user logs in).

Please use the following articles to configure authentication of widgets:

## Configuration

### Regular web application

The session of the user is stored server-side (with the use of cookies), e.g. ASP.NET, ASP.NET Core, PHP etc.

The application should have an endpoint that returns the access_token to the browser of the end-user.

1. Set the ``audience`` property to ``https://widgets.brunstad.org``
    * located in the OpenID
      Configuration ([see ASP.NET Core Tutorial for an example](/docs/bcc-signon/asp.net-core#get-your-application-credentials))
      .
2. Create an endpoint that returns the access_token of the
   end-user ([see ASP.NET Core Tutorial for an example](/docs/bcc-signon/asp.net-core#add-account-controller)).

    * The access_token should be able to be requested from browser (based on the cookie of the user).

3. Set the data-authentication-type attribute in the Widgets script tag to "WebApp"

4. Set the data-authentication-location attribute in the Widgets script tag to the path of the endpoint from step 2

#### Example

````html
<!-- topbar widget -->
<script id="script-bcc-..." data-authentication-type="WebApp" data-authentication-location="/Account/accesstoken"
        src="https://widgets.bcc.no/widgets/TopbarJs"></script> <!-- end topbar widget -->
````

##### Alternative approach

**Note**: This option is intended as a fallback for option 1, if your application cannot implement option 1.

This option can be used by applications that use server-side rendering (e.g. with most traditional applications).

Configure the top bar for ‘inline access_token’:

1. Set the ``data-authentication-type`` attribute to ```"inline-access-token"```
2. Remove the ``data-authentication-location`` attribute
3. Request an access_token for the Widgets API, by setting the ``audience``
   to ``https://widgets.brunstad.org``  ([see ASP.NET Core Tutorial for an example](/docs/bcc-signon/asp.net-core#edit-configuration-file))
   .
4. Add the ``data-access-token`` attribute with the access_token of the end-user

````html
<!-- topbar widget -->
<script id="script-bcc-..." data-authentication-type="inline-access-token" data-access-token="ACCESS_TOKEN OF END USER"
        src="https://widgets.bcc.no/widgets/TopbarJs"></script>
<!-- end topbar widget -->
````

### Single Page Application

The session of the user is stored in the browser of the user, e.g. Angular, React, etc.

The application should provide the path of the access token.

1. Set the data-authentication-type attribute to "SPA"
2. Set the data-authentication-location attribute to the path in LocalStorage. this also supports a nested JSON object
   in the value of the LocalStorage entry (e.g. oidc.accesstoken).

#### Example

````html
<!-- topbar widget -->
<script id="script-bcc-topbar" data-authentication-type="SPA" data-authentication-location="oidc.accesstoken"
        src="https://widgets.bcc.no/widgets/TopbarJs"></script>
<!-- end topbar widget -->
````

## Signout

BCC Widgets uses LocalStorage of your application to store (and cache) values. The storage of BCC widgets can be cleared
by loading the following HTML page:

````html
<!DOCTYPE html>

<html>
<head>
    <title>signout</title>
</head>
<body>

<div>
    <script src="https://widgets.bcc.no/widgets/signoutjs"></script>
    <script>
        window.location = "path to clear session"
    </script>
</div>
</body>
</html>
````

**Path to clear session**: The user gets redirected to this location after widgets has been signed out.

---

# Topbar

The topbar widget can be included at the top of a web page to provide:

* Links to central websites (BMM, Brunstad TV, YEP…)
* Links to local churches
* Show personalized information of the user (e.g. display the name of the user)
* Logout function

## Install the topbar

**WordPress applications that have the ``BCC Signon`` plugin installed should not follow this tutorial (the topbar is
already included in the plugin).**

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

Inside of the data-app-title attribute you can add the title of the application and in data-app-url, the url of the
website you want to point to. That can, for example, be:

``data-app-title="BCC Developer" data-app-url="https://developer.bcc.no"``

## Configuration:

Please check the [widgets authentication](#widgets-authentication).

---

# Calendar - Integration

## Integrate your calendar with Brunstad Portal

The calendar on Brunstad Portal contains events from the Brunstad calendar in addition to events from a personalized
selection of local church calendars. Users are able to choose the local calendars from a list and have these shown in
the same view as the Brunstad calendar. For instance, the friends from Germany can see events from Brunstad, Hessenhöfe
and their local church in a merged view.

This personalized calendar is also available in iCal format, so that it can be added to your calendar in Outlook and on
your cell phone.

The calendars are synchronized as iCalendars, and here you’ll find information on how you as a developer should make the
iCalendar feed.

## How do we share our calendar with Brunstad?

In order to make it possible to add your calendar to the list, it is required that you create a dynamic **iCalendar
feed**
and send the hyperlink to [support](mailto:it@bcc.no?subject=Support Developer BCC).

If you’re creating the feed yourself (i.e. not using Google or other existing services), please make sure the link is
making use of a [Private URL](/docs/bcc-signon/openid-connect#protect-news-feed-and-calendar).

## What is ICalendar?

iCalendar is an open, simple, text-based format for calendar exchange on the Internet. You can read more about this on
[Wikipedia](https://en.wikipedia.org/wiki/ICalendar).

Detailed information regarding the format is found [here](https://datatracker.ietf.org/doc/html/rfc5545).

Google Calendar has built-in support for iCal export. This means that the churches that use Google Calendar don’t have
to do more than sending us the «private» link to their Google Calendar.

You can read more about how to get your private iCal Link [here](https://support.google.com/calendar/answer/37648?hl=en).

## Link to share with Brunstad

**This article only applies if you make the feed yourself. If you’re using existing services, like Google Calendar, you
don’t have follow this article.**

The link to your iCalendar feed should follow this syntax:

### Syntax

``http://{domain name}/{file path}?start-min={RFC 3339}&start-max={RFC 3339}&updated-min={RFC 3339}``

### Example

``http://church.brunstad.org/icalfeed?start-min=2010-12-19T16:39:57-08:00&start-max=2011-01-19T16:39:57-08:00&updated-min=2011-03-20T16:39:57-08:00``

**[RFC3339](https://tools.ietf.org/html/rfc3339#section-5.8)** is a standardized time format.
Please make sure the link is making use of a [Private URL](/docs/bcc-signon/openid-connect#protect-news-feed-and-calendar)..

| Parameters      |                                                         |
|-----------------|---------------------------------------------------------|
| ``start-min``   | The first start date of events being returned.          |
| ``start-max``   | The latest start date of events being returned.         |
| ``updated-min`` | Only events updated after this date should be returned. |

## ICalendar Feed Format

The format should be standard iCal format, but the calendar on Brunstad Portal will only read VEVENT elements (VTODO and
VJOURNAL will be ignored).

The most important fields for each VEVENT element are:

* UID DTSTART (RFC 3339 format)
* DTEND (RFC 3339 format)
* LAST-MODIFIED (RFC 3339 format)
* STATUS (Confirmed/Tentative/Cancelled)
* SUMMARY (title)
* DESCRIPTION (optional)
* LOCATION (optional)
* ORGANIZER (optional)

UID can for example be in format {domain name}-{ID}, where ID is the unique identification of the event from your
database. **UID has to be the same each time the same event is retrieved.**

Events occurring at central conference centers that have their own calendar on Brunstad Portal (for instance Brunstad,
Pagedal and Hessenhöfe) should not be included in the calendar from your local church.

### Categories
We would like everyone to use the categories on the list below in the CATEGORIES field, so that categories are common for all calendars.

A category with the name of the church will automatically be set, so you don’t need to set other categories than those describing what kind of event the appointment concerns.

It is fully possible to have several categories per event, the event «Meeting with collection » will for example have both categories Meeting and Collection. The categories Brothers and Sisters should only be used if the event regards only either brothers or sisters. If the category Internal is set, the article will only be shown to friends from your local church. You may also choose to have a separate feed containing events that should only be visible to a specific group of people.

If the category Brunstad is set, the event will not be imported, as Brunstad events have their own calendar on Brunstad Portal.

The following categories can be used (these should NOT be translated into other languages):

* Conference
* Feast
* Meeting
* Collection
* Work party
* Activity Club
* Sport
* Music
* Trip
* Children
* Youth
* Seniors
* Brothers
* Sisters
* Jubilee
* Wedding
* Funeral

## ICalendar Feed Example

````
BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//ddaysoftware.com//NONSGML DDay.iCal 1.0//EN
    BEGIN:VTIMEZONE
        TZID:Central European Standard Time
        BEGIN:STANDARD
            DTSTART; VALUE=DATE:18000101
            RRULE:FREQ=YEARLY;BYDAY=SU;BYHOUR=3;BYMINUTE=0;BYMONTH=10;BYMONTHDAY=25,26,27,28,29,30,31
            TZOFFSETFROM:+0200
            TZOFFSETTO:+0100
        END:STANDARD
        BEGIN:DAYLIGHT
            DTSTART; VALUE=DATE:18000101
            RRULE:FREQ=YEARLY;BYDAY=SU;BYHOUR=2;BYMINUTE=0;BYMONTH=3;BYMONTHDAY=25,26,27,28,29,30,31
            TZOFFSETFROM:+0100
            TZOFFSETTO:+0200
        END:DAYLIGHT
    END:VTIMEZONE
    BEGIN:VEVENT
        STATUS:Confirmed
        SUMMARY:Velkomstfest
        DESCRIPTION:Gruppe 2 har ansvaret for festen.
        CATEGORIES: Feast
        CREATED:20110110T215920
        ORGANIZER; CN=John Doe:MAILTO:john.doe@example.com
        DTEND:20110326T210000
        DTSTAMP:20110324T151340
        DTSTART:20110326T180000
        LAST-MODIFIED:20110323T211704
        LOCATION:Adjunkt Hauglands gate 50
        SEQUENCE:5
        UID:stavanger.brunstadworld.org-4672
    END:VEVENT
    BEGIN:VEVENT
        STATUS:Confirmed
        SUMMARY:AKJ-tur
        DESCRIPTION:For de i 6. og 7. klasse
        CATEGORIES:Trip
        CREATED:20101026T200043
        DTEND:20110220T200000
        DTSTAMP:20110324T151341
        DTSTART:20110218T173000
        LAST-MODIFIED:20110215T103808
        LOCATION:Solheimsdalen
        SEQUENCE:3
        UID:stavanger.brunstadworld.org-4473
    END:VEVENT
END:VCALENDAR
````

## Developer Tips

### Content-Type
When the iCalendar feed is generated, the HTTP content-type header should be set to **text/calendar**.

### PHP

There are several components available for development of iCalendar feeds in PHP.

See for example [this post](http://bradym.net/php/creating-icalendar-ics-files-with-php).

There are also existing solutions for CMS platforms like Joomla that can probably be taken into use with some
customization. See for example [this extension](http://extensions.joomla.org/extensions/extension-specific/eventlist-extensions/7219).

### ASP.NET
ASP.Net developers can use the [DDay.iCal](http://www.ddaysoftware.com/Pages/Projects/DDay.iCal/) component to generate an iCal feed.

````c#
using System;
using System.Collections.Generic;
using System.Web;
using System.Data.Sql;
using System.Data.SqlClient;
using DDay.iCal;
using DDay.iCal.Serialization.iCalendar;
using System.Web.Configuration;

namespace iCalExport.General
{
    public class iCalFeed : IHttpHandler
    {
        public HttpRequest Request
        {
            get
            {
                return HttpContext.Current.Request;
            }
        }
        public void ProcessRequest(HttpContext context)
        {
            string prefix = WebConfigurationManager.AppSettings["DomainName"];
            DateTime minAllowableDate = new DateTime(1900, 1, 1);

            string qUpdatedMin = Request.QueryString["updated-min"];
            DateTime updatedMin;
            if (!DateTime.TryParse(qUpdatedMin, out updatedMin) || updatedMin < minAllowableDate)
                updatedMin = new DateTime(1900, 1, 1);


            string qStartMin = Request.QueryString["start-min"];
            DateTime startMin;
            if (!DateTime.TryParse(qStartMin, out startMin) || startMin < minAllowableDate)
                startMin = DateTime.Now.AddMonths(-3);


            string qStartMax = Request.QueryString["start-max"];
            DateTime startMax;
            if (!DateTime.TryParse(qStartMax, out startMax) || startMax < minAllowableDate)
                startMax = DateTime.MaxValue;

            context.Response.ContentType = "text/calendar";

            iCalendar iCal = new iCalendar();

            TimeZoneInfo tzi = null;
            tzi = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time");
            iCal.AddTimeZone(tzi);

            using (SqlConnection sqlConn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["connstring"].ConnectionString))
            {
                SqlCommand sqlComm = new SqlCommand("SELECT * FROM Calendar WHERE EventStart > @startmin AND EventStart < @startmax AND EventModifiedDate > @updatedmin ORDER BY EventModifiedDate DESC", sqlConn);
                sqlComm.Parameters.AddWithValue("@startmin", startMin);
                sqlComm.Parameters.AddWithValue("@startmax", startMax);
                sqlComm.Parameters.AddWithValue("@updatedmin", updatedMin);
                sqlConn.Open();
                SqlDataReader dr = sqlComm.ExecuteReader();

                while (dr.Read())
                {
                    Event evt = iCal.Create();
                    evt.UID = prefix + "-" + dr["EventID"].ToString();
                    evt.DTStart = new iCalDateTime(Convert.ToDateTime(dr["EventStart"]));
                    evt.DTEnd = new iCalDateTime(Convert.ToDateTime(dr["EventEnd"]));
                    evt.Summary = dr["EventTitle"].ToString();
                    evt.Description = dr["EventDescription"].ToString();
                    evt.Location = dr["EventLocation"].ToString();
                    evt.Status = Convert.ToBoolean(dr["EventIsCancelled"]) ? EventStatus.Cancelled : EventStatus.Confirmed;

                    evt.Created = new iCalDateTime(Convert.ToDateTime(dr["EventCreatedDate"]));
                    evt.LastModified = new iCalDateTime(Convert.ToDateTime(dr["EventModifiedDate"]));

                    evt.Sequence = Convert.ToInt32(dr["EventVersion"]);

                    evt.IsAllDay = Convert.ToBoolean(dr["EventIsAllDay"]);

                    List Categories = new List();
                    using (SqlConnection sqlCatConn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["connstring"].ConnectionString))
                    {
                        SqlCommand sqlCatComm = new SqlCommand("SELECT BrunstadCategoryName FROM Categories WHERE NOT BrunstadCategoryName is null AND ID_Category IN (SELECT ID_Category FROM CalendarCategories WHERE ID_Calendar = @ID_Calendar)", sqlCatConn);
                        sqlCatComm.Parameters.AddWithValue("@ID_Calendar", dr["EventID"].ToString());
                        sqlCatConn.Open();
                        SqlDataReader drCat = sqlCatComm.ExecuteReader();

                        while (drCat.Read())
                        {
                            Categories.Add(drCat["BrunstadCategoryName"].ToString());
                        }
                    }
                    evt.Categories = Categories;


                }
            }

            iCalendarSerializer serializer = new iCalendarSerializer(iCal);

            context.Response.Write(serializer.SerializeToString(iCal));

        }
    }
}
````

---

# Calendar – widget

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


---

# News

### Integrate your news with Brunstad Portal

Articles from local churches are being collected via RSS to be shown on Brunstad Portal. News and information from all
local churches are shown on the Brunstad Portal start page, and users can select which content they are interested in
seeing on their front page.

Here you’ll find information on how you as a developer should make the RSS feed.

#### How do we share our news on Brunstad Portal?

You are required to make your own RSS-feed containing news to be accessible via Brunstad Portal and send us the URL.

#### Warning

The url should be a [private url](/docs/bcc-signon/openid-connect/#protect-news-feed-and-calendar) and not protected by
signon. Because the contents of the news feed is then technically available to anyone (if they know the url), it’s best
to keep the information in the feed to a minimum and to avoid any sensitive information. You should only include the
title, the link to the article, the publication date, a unique id for the article and a link to the thumbnail image.
Read more about the format [here](#rss-format). The actual content (ingress, description, body) of the articles should not be included
in the RSS feed.

#### What is RSS?

RSS is a simple and open XML-based format used to exchange news and articles on the Internet. We follow the
standard [RSS 2.0](https://www.rssboard.org/rss-specification).

Read more about RSS on [Wikipedia](https://en.wikipedia.org/wiki/RSS)

## RSS Link to be shared with Brunstad

We would like to get a link in the following format:

#### Syntax 
``http://{domain name}/{file path}?updated-min={RFC 3339}&max-results={int}``

#### Example
``http://church.brunstad.org/rssfeed?updated-min=2019-01-31T16:39:57-08:00&max-results=100``

**RFC3339** is a standardized time format.
Please make sure the link is making use of a [Private Url](/docs/bcc-signon/openid-connect/#protect-news-feed-and-calendar).

### Parameters

The link should contain the following parameters, so that our indexing service does not have to retrieve all
data on every update. Alternatively, you can omit the parameters, and instead make the feed **return only the ten most
recent events**. Thank you for understanding. You are welcome to contact support if you have any questions about this.

| Parameter       | Description                                                      |
|-----------------|------------------------------------------------------------------|
| ``updated-min`` | Only entries updated after this date should be returned.         |
| ``max-results`` | Maximum number of entries to be returned. Return latest entries. |


## RSS Format

The following fields are **required** for each ``<item>``:

| Field         | Description                                                                                                                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``<title>``   | The article heading/title.                                                                                                                                                                                                                                  |
| ``<link>``    | Must contain the complete URL to the article itself on your web site.                                                                                                                                                                                       |
| ``<pubDate>`` | The time when the article was published.                                                                                                                                                                                                                    |
| ``<guid>``    | A global unique identification for each article, preferably in the form {URL}-{ID} where URL is for example lokalmenighet.brunstadworld.org and ID is the unique ID of the entry in your database. This should be the same each time the feed is generated. |

The following fields are **optional** for each ``<item>``:

| Field         | Description                                                                                                                                                                                                                                                                                                                                                                            |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``<enclosure>``   | Specifies the image to be shown on the thumbnail on the portal. The image will be downscaled if it is too large, but it should have at least 150px width. Please follow the [RSS 2.0 Specification](https://www.rssboard.org/rss-specification#ltenclosuregtSubelementOfLtitemgt) to see what the required attributes are. The url to the image should NOT be protected by signon. (You may omit the ``length`` attribute, because it’s currently not used by us.) |
| ``<category>``    | An ``<item>`` can contain this tag. If the value of the tag contains “internal”, the item will be marked as internal (read more below).                                                                                                                                                                                                                                                                                                                  |

### Internal items 
If the special category “internal” is used, the article will only be shown to the friends from your local
church. You can also allow people from other churches to read the internal posts from your feed. In that case, please
contact us and specify what churches apart from your local church should be able to read your internal posts. It is also
possible to do this on a country basis. (E.g. all friends from France can see internal posts from “france_news”.)

## RSS Example
Here is an example of a RSS Feed:

````html
<?xml version="1.0" encoding="utf-16" standalone="yes"?>
<rss version="2.0">

<channel>
    <title>StavangerWEB</title>
    <link>http://stavanger.brunstadworld.org/</link>
    <description>Artikler fra forsiden på StavangerWEB</description>
    <pubDate>Tue, 29 Mar 2011 13:34:45 GMT</pubDate>
    <lastBuildDate>Tue, 29 Mar 2011 13:34:45 GMT</lastBuildDate>
    <docs>http://www.rssboard.org/rss-specification</docs>
    <ttl>30</ttl>
    <item>
        <title>Dugnad på Snøde</title>
        <link>http://stavanger.brunstadworld.org/documents.asp?id=1855</link>
        <pubDate>2011-03-28T19:07:57</pubDate>
        <guid>stavanger.brunstadworld.org-1855</guid>
        <enclosure url="http://stavanger.brunstadworld.org/images/ingress-123.jpg" length="22356" type="image/jpeg" />
    </item>
    <item>
        <title>Skøytegruppa</title>
        <link>http://stavanger.brunstadworld.org/documents.asp?id=1856</link>
        <pubDate>2011-03-28T16:28:53</pubDate>
        <guid>stavanger.brunstadworld.org-1856</guid>
        <enclosure url="http://stavanger.brunstadworld.org/files.asp?id=27835" length="24756" type="image/jpeg" />
    </item>
    <item>
        <title>Vaskelag uke 48</title>
        <link>http://stavanger.brunstadworld.org/documents.asp?id=1857</link>
        <pubDate>2011-01-28T16:28:53</pubDate>
        <guid>stavanger.brunstadworld.org-1856</guid>
        <enclosure url="http://stavanger.brunstadworld.org/files.asp?id=27635" length="24776" type="image/jpeg" />
        <category>internal</category>
    </item>
</channel>

</rss>
````

## Modify the properties of your feed

You can modify certain properties of your feed. The actual modification must be done by us, but you can contact us and specify what properties you would like to modify.

The following properties of a feed can be modified:

#### **Local Feed**

You can associate any number of churches and/or countries with a feed and say that the feed is local to people from those churches/countries. If a feed is local to you, posts from that feed will show up in your “Local” section, instead of your “Worldwide” section. By default, a feed for a local church is marked as local for people from that church. However, you may want to make the feed local for other churches as well. (Unrealistic example: Maybe you have a feed called “Fjellnytt” that you want to be local to people from not only Hallingdal, but also Valdres and Harstad.)

#### **Who can see internal posts?**

You can associate any number of churches and/or countries with a feed and say that people from those churches/countries can see internal posts from that feed. By default, people can see internal posts from the feed for their local church. However, you may want to let people from certain other churches/countries see internal posts from your feed as well.


## Developer Tips

### XML Encoding
It is important that text fields that can contain special XML characters, like for instance < or > are properly encoded, so that they do not result in invalid XML.

There are various ways to do this:

* Use XML/HTML encoding so that ``>`` is replaced by ``&gt`` and ``<`` with ``&lt`` etc. For example:``<title>Some html encoded title.</title>``
* Use ``<![CDATA[ ]]>`` around all content. For example:
``<title><![CDATA[Some title with special characters.]]></title>``
* Use libraries to generate the RSS XML that handles this automatically (such as XElement in the System.Linq.Xml library in .Net 3.5+)

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
| ``data-authentication-type`` and ``data-authentication-location`` | Please check the [documentation](#widgets-authentication) on widget authentication.                                                                                                                                                                                                             |
| ``data-language`` (optional)                                      | The language for the calendar to be returned in. If not specified, the language will be set to English                                                                                                                                                                                          |
|                                                                   | **DE** (German), **EN** (English), **FI** (Finnish), **FR** (French), **NO** (Norwegian), **NL** (Dutch), **ES** (Spanish)                                                                                                                                                                      |                                                                                                                                                                                                                     |
| ``data-churchname`` (required)                                    | What church to show birthdays from. The value is simply the name of the church. For your own church, the church name can be found on the [profile page](https://members.bcc.no/profile/). Special characters like æ, ø, å, ä, ü and ö are supported. “hessenhöfe” is for example a valid value. |
| ``data-maxdays `` (optional)                                      | Maximum number of days (counted from today) to return. Default is 3 days.                                                                                                                                                                                                                       |


---
