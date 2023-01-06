---
title: Advanced Configuration
---

## OpenId Connect Configuration

*OpenID Connect* (OIDC) is the protocol used for handling authentication. These settings are configured using environment variables or constants in *wp-config.php*:

| Setting                    | Description                                         |
| -------------------------- |---------------------------------------------------- |
| OIDC_CLIENT_ID             | (Required) OIDC ClientID obtained from IT support   |
| OIDC_CLIENT_SECRET         | (Required) OIDC Client Secret obtained from IT support |
| OIDC_CREATE_USERS          | (Optional) Default: `false` - used to create corropsonding users automatically in WP when users log in (**Strongly discouraged**)       |
| OIDC_AUTHORITY             | (Optional) Default: `https://login.bcc.no`       |
| OIDC_ENDPOINT_TOKEN_URL    | (Optional) Default: `https://login.bcc.no/oauth/token`  |
| OIDC_ENDPOINT_USERINFO_URL | (Optional) Default: `https://login.bcc.no/userinfo`  |
| OIDC_ENDPOINT_LOGOUT_URL | (Optional)  |
| OIDC_SCOPE                 | (Optional) Default: `email openid profile church`  |
| OIDC_DEFAULT_VISIBILITY            | (Optional) Alternative to configuring via UI - see below  |
| BCC_WP_FEED_KEY            | (Optional) Alternative to configuring via UI - see below  |
| BCC_WP_MEMBER_ORGANIZATION_NAME            | (Optional) Alternative to configuring via UI - see below  |

It is strongly discouraged to enable the *OIDC_CREATE_USERS* setting. This function will create users in Wordpress every time a new user logs in. Enabling this function can both result in poorer performance (due to less effective caching) and also result in GDPR infringement (storing personal data without a legitimate reason).

## Default Content Access

This setting controls the default visability of new pages and posts.

1. **Public** - visible to all users, without logging in
2. **Authenticated Users** - only visible to logged in users
3. **Members** - only visible to members of the specified *Member Organization* (see below)

## Feed Key

If the feed key has been filled out (with a random GUID), the RSS feed will be available at this URL. Please share this URL with BCC IT
by contacting [support](it@bcc.no?subject=Support%Developer%BCC).

## Enable TopBar

This enables BCC’s new top bar widget, that you already see on this website.

If you enable this, you can delete the old top bar script tag (See the documentation of the old top bar)

## Member Organization

If you want to identify the users which log in to your website by church, e.g. for displaying specific
content or give access to some pages just to members from your local church, find the church name in the list below and
type it in the text field on the BCC Login Settings page. If the church you’re coming from is not in the list you can
contact [support](it@bcc.no?subject=Support%Developer%BCC).

* Argentina 
  * Paso Flores
  * Villa Regina 
* Australia 
  * Melbourne
  * Sydney 
* Austria 
  * Graz 
  * Mittewald 
  * Raumberg 
  * Wien 
* Brasil 
  * Novo Sarandi 
  * Para 
* Cameroon 
  * Bafoussam
  * Douala
  * Yaoundé 
* Canada 
  * Ottawa 
  * Toronto 
  * Vancouver
  * Winnipeg 
* Chile 
  * Curico 
  * Valdivia 
* China
  * Shanghai 
  * Shenzhen 
  * Singapore 
* Congo
  * Congo 
* Denmark
  * Holstebro
  * København 
* England
  * Didcot
  * Huntworth 
* Finland
  * Kyrkslätt 
  * Lahti 
* France 
  * Nancy 
  * Paris 
  * Steinseltz 
* Germany 
  * Dürrmenz
  * Exter 
  * Fulda 
  * Hamburg
  * Hessenhöfe 
  * Lilienhof 
  * Linnenbach 
  * Maubach 
  * Waldhausen
  * Waltrop 
* Hong Kong 
  * Hong Kong 
* Hungary 
  * Vácduka 
* India 
  * Alwaye 
  * Bangalore 
  * Coimbatore
  * Goa 
  * Langtore
  * Mumbai 
  * Pune 
  * Trivandrum 
* Italy 
  * Catania 
  * Sardinia 
* Kenya 
  * Kisii 
  * Kisumu 
  * Nyakweri
  * Rodi
  * Kopany 
* Mexico 
  * Leon 
* Netherlands 
  * Flevoland
  * Groningen
  * Rotterdam 
  * Schermer 
  * Terwolde
  * Twente 
  * Utrecht
  * Zeeland-Belgie 
* New Zealand
  * New Zealand 
* Norway 
  * A-lag Brunstad
  * Bergen
  * Brunstad 
  * Drammen 
  * Eiker
  * Grenland
  * Hallingdal
  * Hamar
  * Harstad 
  * Horten
  * Hønefoss
  * Molde 
  * Måløy 
  * Oslo/Follo
  * Sandefjord
  * Stavanger
  * Stord
  * Sørlandet
  * Tønsberg 
  * Valdres
  * Østfold 
* Peru
  * Ilo 
* Poland
  * Malinka
  * Wroclaw 
* Romania
  * Adjud 
  * Brasov
  * Bucharest
  * Caragiale 
  * Crasna 
  * Giurgiu 
* Russia
  * Central Russia 
  * St. Petersburg 
* South Africa
  * Pretoria 
  * Vanderbijlpark 
* Spain
  * Mallorca 
* Sri Lanka
  * Colombo 
* Switzerland
  * Schweiz 
* Turkey
  * Istanbul
* Ukraine
  * Beljaevka
  * Ozornoe 
  * Ternopol
  * Zakarpattia
* United Arab Emirates
  * Dubai 
* USA 
  * Connecticut 
  * Delaware 
  * Detroit
  * Missoula
  * Missouri
  * Salem
  * Seattle
  * Syracuse 
  * Urbana 
* (no country) 
  * A-lag MOBILT

---

Next: [Getting User Information →](getting-user-information)