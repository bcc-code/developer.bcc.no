# BCC Coding Guide

## 0. Purpose
The purpose of this guide is to provide a set of _best practices_ for development of web applications and apps for BCC. Each project has it's own constraints and requirements, but this is intended to be a good starting point.


## 1. Application Security

### 1.1 Authentication 
_Authentication_ relates to identifying a user or client.

* **Use OAuth 2.0 (client credentials flow) for application-to-application communication.**  
  Why: OAuth 2.0 is an industry standard and will allow simple, yet centralized control of which clients are permitted to access which APIs / resources. Clients only have one set of credentials (clientid / clientsecret) for accessing _all_ participating APIs. These credentials are not shared with anybody (not even the token/authentication authority!).

* **Use OpenID Connect for end-user authentication and identification**  
  Why: OpenID Connect (OIDC) is an industry standard for single sign on, adding an "identity" layer on top of OAuth 2.0
 
* **Use OAuth 2.0 (PCKE flow) for end-user consent of access to their resources (APIs)**  
  Comment: Combined with OIDC, OAuth allows the end-user to decide if (third party) apps can access resources (APIs) on their behalf. Whereas Open ID Connect identifies the user (authentication), OAuth 2.0 allows the user to delegate API access (authorization).
  
* **ONLY use shared secrets / API keys / basic authentication between internal services and resources** (i.e. within the bounds of a single application).  
  API keys / shared secrets offer a simple mechanism for authentication (which does not require a central authentication authority, token requests etc.). However, these secrets don't usually expire and are hard to keep track of (lack governance) and should therefore NOT be used for integration between applications. An appropriate use case would be accessing storage related to a particular service or as an extra layer of security (in addition to network security) between internal services.

* **Avoid secrets** altogether by using *Managed Identities**, **Federated Credentials** and similar techniques for communication between services when deploying to the cloud.


### 1.2 Authorization
_Authorization_ relates to understanding which permissions / access rights an authenticated user or client has.

* **Use OAuth 2.0 scopes for course-grained authorization**  
  Typically scopes should be used to determine which API's a client application has access to, and perhaps differentiate between different access levels at a very high level (read, write, admin).
  
* **Fine grained authorization is _business logic_**  
 Authorization rules are usually very use-case and system specific and are essentially business logic. They should be implemented in the domain layers of an application rather than the presentation (routing, transport, controllers, UI) layers of an API / application. 

* **Don't centralize authorization management**
Since authorization rules are business logic, they shouldn't be 'outsourced' to a centralized "a permissions administration app". Differentiate between high level / course grained authorization, which should be centralized (to provide governance) and fine-grained, system specific permissions.  
As a rule of thumb: permissions are specific to your app, should be managed within your app.


### 1.3 Network Security

* **Encrypt _all_ public traffic**  
All public network traffic MUST be encrypted (e.g. using SSL).

* **Single cloud deployments simplify security**  
Network and resource security within a single cloud (Azure, GCP etc.) is significantly simplified compared to a multi-cloud deployment. This is because a multi-cloud deployment typically will require exposing internal resources to the Internet as well as the use of shared secrets etc. 


## 2. Open APIs
All new projects should follow an API-first, open API approach. APIs should be complete, and consumable by others.

### 2.1 Why Open APIs?
 Providing fully fledged, easily consumable APIs will allow for better collaboration between teams, and open possiblities for new ways of combining data, creating richer user experiences - in short - fostering innovation. Public API's should not be an _afterthought_, but are a core part of our development _culture_.

### 2.2 Committing to a Public API
Although there is little technical difference between a Open or "public" API and internal APIs, Open APIs are essentially a commitment to a contract which you can't easily back out of.

* **Models**  
Models should be well thought through. _More is less_ - rather keep the size of your models (and therefore your comittment) small, than committing to large models which you may want to change in future. Carefully consider if changing business requirements may affect the names of the fields you expose over time. E.g. does it make sense to expose "ChurchID" as a field, or should you rather use something more general (and more resilient to change) such as "OrganizationID"?

### 2.3 **Technologies**
* **RESTful HTTP-based APIs using JSON**
Currently the defacto standard for Open APIs. Lightweight and human-readable.

* **gRPC with protobuf**
Offers better performance and easier code generation, but a bit harder to set up and use, and not human readable in transit.

* ** **

### 2.4 Documentation
* **Public Documentation** should be included in the `docs` folder of your repository in markdown format. This can easily be published to the developer portal. ([Read guide here](https://developer.bcc.no/bcc-documentation-base/deploying-site/#publishing-documentation)).


## 3. Development Frameworks

### 3.1 Front-end
#### Frameworks
* **Vue JS** is the preferred javascript framework for web interfaces. 
* **Tailwind CSS** is the preferred CSS framework. 

#### Libraries
The [BCC Design System](https://github.com/bcc-code/bcc-design) consists of a set of guidelines and libraries which can be used in your products.

* **[Design Library](https://developer.bcc.no/bcc-design/design-library/)** with CSS and Vue implementation of components, tokens and typography
* **[Icons](https://developer.bcc.no/bcc-design/icons/)** based on Material Design, in SVG and Vue component formats
* **[Logo Assets](https://developer.bcc.no/bcc-design/logos.html)** for members of the BCC Federation

### 3.2 Back-end
* **.Net 6+** is the preferred framework for developing web APIs. We also have projects using **Node JS** and **Go**.

### 3.3 App Development
* **Flutter** is the preferred framework for developing mobile apps that requires high performance custom UIs.
* **Capacitor /w Vue** is the preferred framework for developing mobile apps that doesn't require high performance custom UIs. Faster dev speed and is cross platform (web).
* **Electron** is the preferred framework for developing desktop apps.

### 4.4 Content Management
* **WordPress** is the preferred content management system for building websites.
* **Directus** is currently the preferred content management system for applications.


The technologies listed above are the preferred ones. Please refer to the [Technology Radar](./tech-radar.md) for a more comprehensive list of assessed, tried, adopted (recommended) and on-hold (not-recommended) technologies.


## 4. Deployment

### 4.1 CI/CD
* **All** code should be deployed using CI/CD pipelines (e.g. Github Actions) that are defined within the repository (e.g. in YML files). 

### 4.2 Infrastructure as Code
* Cloud infrastructure should ideally be defined as code (using **Terraform**). Work is in progress on providing provisioned environments and starter templates for infrastructure.

### 4.3 Cloud Deployment
* In general, applications should be run horizontally scalable **Docker Containers**.
* The *preferred* cloud platform is **Microsoft Azure**. We currently also have projects running on **GCP**, and **AWS** is used for niche services (e.g. content delivery)
* Consider scalable services with request / consumption based pricing

### 4.4 Database
* **Postgresql** is the standard for relational databases. We also have several services currently using Microsoft SQL.
* Use *mainstream* database technologies that are supported by major cloud vendors unless there is a real need to use niche services

