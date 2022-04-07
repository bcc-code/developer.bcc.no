# Plugin Configuration

The settings of BCC Signon are grouped into two panels:

* OpenId Connect Client (OIDC Settings) contains all the settings related to the login of users.
* BCC Signon (BCC Settings) contains all the setttings related to BCC’s widgets: newsfeeds, topbar

## OpenId Connect Client Settings

Most of the fields are pre-filled according to BCC’s configuration.

However, there are some settings you’ll have to configure:

### Login Type

OpenID Connect button on login form – is set by default. Keep it this way while setting up/testing the plugin.

Auto Login – SSO will redirect automatically the users to Auth0 login page.

**Note**: Activate this only when the plugin is ready to be launched on production.

### Client ID & Client Secret Key

Fill in your Client ID and Client Secret Key. If you have not received these, please contact support.

### OpenID Scope

Here you can request different scopes. More information is available here.

### Enforce Privacy

With this setting you can decide whether the website will request authentication or not. In most of the cases this
should be set to on and the Unprotected URLs field can be used to skip the privacy for one or more URLs.

### Protected URLs / Unprotected URLs

This text field allows you to add / skip privacy for defined URLs. Regular expressions can very well be used as well.
Example: if you want to add / skip privacy for all the articles which are under the category ‘local’, you would use
“/local/”.

### Enable Logging

A logger is available; it’s recommended to only use this for testing purposes since it uses the wp_options table to
store the logs.

## BCC Signon Settings

### BCC Signon URL

This is BCC’s base URL for the authentication domain; this setting is pre-filled, you don’t need to change it.

### Enable private newsfeed

If you want to integrate your website to BCC’s news feed widget, please enable this setting.

Otherwise, you can turn it off.

### Private newsfeed link

If you have enabled the private newsfeed, the RSS feed will be available at this URL. Please share this URL with BCC IT
by contacting [support](it@bcc.no?subject=Support%Developer%BCC).

### Enable TopBar 

This enables BCC’s new top bar widget, that you already see on this website.

If you enable this, you can delete the old top bar script tag (See the documentation of the old top bar)

### Local church

If you want to identify the users which log in to your website by church, e.g. for displaying specific
content or give access to some pages just to members from your local church, find the church name in the list below and
type it in in the text field on the BCC Login Settings page. If the church you’re coming from is not in the list you can
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

Next: [Plugin Customization →](customization.md)