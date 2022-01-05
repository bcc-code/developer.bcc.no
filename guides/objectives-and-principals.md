* Table of Contents
{:toc}

# Guiding Principals and Objectives
{:.no_toc}

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

[ ] OKRs defined
[ ] Key results being measured

### Usability

[ ] Analytics configured
[ ] Key action / conversion metrics identified and monitored

### Efficiency and Sustainability

[ ] Automated build and deployment pipelines
[ ] Automated tests
[ ] Minimal & documented setup for local development
[ ] Test and/or staging environment configured
[ ] System architecture documented
[ ] Open API (including SDKs)

### Reliability

[ ] Mainstream services and components (no beta, commercial backing, large community)
[ ] APM 

