---
title: Integration
---

# Calendar - Integration

## Page Contents

* [Link to share with Brunstad](#link-to-share-with-brunstad)
* [ICalendar Feed Format](#icalendar-feed-format)
* [ICalendar Feed Example](#icalendar-feed-example)
* [Developer Tips](#developer-tips)

---

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

