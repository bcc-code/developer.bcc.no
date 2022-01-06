# Guiding Principals and Objectives
{:.no_toc}

1. Table of Contents
{:toc}

## Introduction

The purpose of this document is to provide guidence in what to prioritize and why when making architectural decisions and/or planning development projects.

## Overall Objectives - What Matters?

The overall goal in our development projects is to bring *value* to the organization, *effectively* and *efficiently* in the form of products that are *usable*, *reliable*, *secure* and *sustainable*.

### Valuable

By **value**, we mean functionality that actually helps the organization meet its objectives and actually gets used by users.  
To determine if we actually are delivering value, we need to have a *definition* of the organizations objectives (within the scope of the project/product) and we need to be able to *measure* success/failure.

### Effectively

By **effectively** we mean building the right things. This is synonymous with successfully delivering value.

> How effectively we deliver *value* can be determined by defining and measuring OKRs (Objectives and Key Results)

### Efficiently

By **efficiently** we mean delivering quickly and cheaply - "most bang for your buck". Here it important to consider the long term cost of *maintenance*, *technical debt*, *security breaches* etc. before going for a quick win.

> In development, they [DORA metrics](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance) are a good way to measure efficiency. Good [DevOps practices](https://cloud.google.com/blog/products/devops-sre/the-2019-accelerate-state-of-devops-elite-performance-productivity-and-scaling) are what help improve these metrics.

### Usable

By **usable** we mean that the user experience is intuitive and pleasant. This means that the target audience understand how to use the product with minimal support and enjoy using it. They are able to find the tools and information they need.
Again, this can and should be measured.

> Measuring usability can be done in the form of user surveys, monitoring system use (% of target audience that uses features), and monitoring support cases.

### Reliable

By **reliable** we mean that the system works as expected, all the time - even under high load.

> Reliability can be measured using APM (Application Process Monitoring), logging and tracing tools such as Application Insights

### Secure

By **secure** we mean that the integrity of both *personal* data and *organizational assets* is ensured. It also implies that data is stored in a legally compliant manner. Security involves not only protecting systems from attack, but also reducing the risk involved if (and when) an attack should occur. It also involves having *control* of who has access to what, also within the organization (i.e. governance).

> Security is never absolute, but can be monitored using audit logs and improved by following best practices on development and governance.

### Sustainable

By **sustainable** we mean ensuring that what we develop today, will continue to work reliably, securely and cost effectively in the future - without being dependent on a single person. In short, the solution needs to be *maintainable* and *viable*.

## Checklists

### Value

* [ ] OKRs defined and measured
* [ ] Prototyping before development

### Usability

> *Ensuring a great user experience*

* [ ] Analytics configured (including identifying and monitoring key metrics)
* [ ] Strategically aligned with other products in BCC ecosystem
* [ ] Compliant with WCAG standards (front-end)
* [ ] Follows BCC's Design System
* [ ] Intuitive and/or inline-documented UI

### Efficiency

> *long term, rather than quick wins*

* [ ] Automated build and deployment pipelines
* [ ] Automated tests
* [ ] Modular, loosely coupled architecture
* [ ] Open API (including SDKs) for any service that other services may need to communicate with
* [ ] Over-engineering avoided

### Sustainability

> *Reducing the bus factor*

* [ ] No use of personal accounts purchasing / running services
* [ ] Minimal & documented setup for local development
* [ ] Well-known, well documented technologies used
* [ ] Test and/or staging environment
* [ ] System architecture documented (along the way)

### Reliability

> *Making sure it works*

* [ ] Scalable architecture
* [ ] Realistic load tests
* [ ] Mainstream services and components (commercial backing, large community, no beta)
* [ ] APM monitoring
* [ ] Alerterting

### Security

* [ ] Backup setup
* [ ] Governance of developer access in place - 2FA, centralized control (e.g. Azure AD)
* [ ] Data encrypted at rest
* [ ] Data encrypted in transit (TLS/SSL)
* [ ] Best security practices for relevant frameworks / components implemented
* [ ] Development doesn't require access to production data
* [ ] Audit logging

## Common "Gotchas"

1. Using personal accounts to set up services
2. Implementing security and compliance as an afterthought
3. Using cloud services from new providers, without considering long-term governance (how will onboarding/offboarding be managed?)
4. Using new, unproven or propriatory technologies that aren't backed by a large organization (often lack support, community, security in the long run)
5. Overengineering (trying to build THE next platform without alignment)
6. Overlooking automated testing and load testing
7. Being dependent on online database for development
