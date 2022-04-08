---
title: News
---

# News

## Page Contents

 * [RSS Link to be shared with Brunstad](#rss-link-to-be-shared-with-brunstad)
 * [RSS Format](#rss-format)
 * [RSS Example](#rss-example)
 * [Modify the properties of your feed](#modify-the-properties-of-your-feed)
 * [Developer Tips](#developer-tips)

---

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