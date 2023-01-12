# 01 Future Architecture for Services in "Members"

## Context

Members 2.0 was developed as an application for managing person data and organizational membership as well as facilitating sharing of data with other systems in a GDPR-compliant manner.
During the initial development fase, there has been a heavy focus on UX and the application experience, and less of a focus on the maturity of back-end services and APIs.
This has given many "quick" wins, however in this second development fase the focus will be on creating stable and mature backend-services that can be used to provide value and enable other teams to deliver applications/services that are dependent on person, organization and membership data.

### Current Issues and Symptoms

#### Brainstorm (from workshop)

1. Users without a membership can't log in
2. No support for multiple addresses (work/private etc.)
3. Legacy integrations - no public API
4. Access to BCC systems limited to members
5. Managing data access (GDPR) possibly overcomplicated
6. Data deletion webhooks not implemented
7. API Landscape is not mapped out and not aligned
8. Users are frustrated with amount and complexity of Apps
    - Family registration(profile)
    - Look and feel of BCC Apps
9. Changes are not enfoced on other Applications (e.g. signout)
10. Lack of test environment (require access to production)
11. 5 minute test time
12. 10 minute Deploy time
13. Lacking global roles
14. Lacking business specification

#### Observations

1. In general, "person" and "membership" is too tightly intertwined to support more flexible scenarios.

2. It is currently difficult to communicate with other teams (changes not enforced) due to:
    - no real public / documented API
    - no client SDKs
    - product/team culture is stronger than organization culture which is reflected in the architecture

3. Somewhat challenging to set up local development environment and gain full insight into current application
    - Mix of concerns within application: process, presentation and integration tightly intertwined
    - Simple errors would require a fairly high level of project knowledge to fix with current solution (both due to code base size and especially due to mix of concerns in code)

**Conlusion**: we need a better separation of concerns (both from a business and technical perspective) and we need a commitment to our public interface.


## Decision

1. Host core APIs related to person, association and organization in one (or few) services (with a public contract).
   Motivation: clear separaton of concerns, highly reusable services that could form part of multiple processes

2. Create a separate profile service (which interfaces to multiple environments and has a different behavioural concern - Query vs. Command)
   Motivation: clear separation of concen, possible interface to multiple other source services and many target applications

3. Keep current "feathers" structure as a BFF (for Members) which utilizes the core APIs
   Motivation: leverage work already done regarding UI, membership processes etc.

4. Long term, it may also make sense to move the "membership processes" from the current "feathers" implementation. This would be specifically useful if membership flows were integrated with other systems. (fase 2)


## Consequences

1. Need to define and create new services

2. Ideally need a microservice hosting environment (already partially being practiced via Cloud Run in all teams)

3. We need a messaging infrastructure

4. We need a good solution for API documentation / consumption (e.g. Open API - v2, Protobuf, GraphQL, SDKs)

5. Migration of legacy integrations

### Alternatives

1. Cleanup current solution (monolith)
   - split presentation and domain layers
   - define public API interface(s)
   - move out highly unrelated services

2. Move fundamental services to their own APIs (microservice approach)
   - integrate current application (front-end) with new backend services
   - ensure clean separation of concerns: application (UI), data aggregation (e.g. profile) and process (e.g. change history etc.)

**Reasons for Monolith approach** (one code base, one process)

- Rapid development (within team at coding time, not necessarily build time)
- Easier to implement processes (within same team)
- Less network communication (lower latency)
- Easier error tracing within application
- Possibily cheaper to run
- Easier to test
- Less "plumbing", simpler infrastructure

**Reasons for Microservice approach** (one or multiple code bases, multiple processes)

- Application (UI) can be split from process and data (e.g. the membership "application" and managing members is a completely different concern than replicating person data)
- Rapid development (within organization)
- Allows for more experimentation and chosing tools that are right for the specific job
- Allows for building "stable" services (which don't undergo continual change). "Once the person database is done, it's done".
- Makes testing simpler within the application (smaller, more clearly defined scope) -- although increases need for integration tests.  
- "Forces" us to have a high level infrastructure for message exchange (messaging / HTTP etc) -- which could drive cross-team alignment at a high level.
- Makes separation of concerns a more natural focus area during implementation (perhaps easier to avoid "laziliy" mixing concerns due to lack of "time" or experience)
- Makes it more natural to be explicit about our public interface (i.e. commitment to other parts of the team or other teams).
- Makes it easier to "visualize" message flows at a high level (between services) -- although at the cost of more "plumbing"
- Allows individual scaling of services - which *can* be more cost effective than scaling one huge service
- Allows for part of a process to fail (and be retried) without an entire process failing.
- Allows for interchangeability - easier to replace or decomission a smaller part of the system/infrastructure
- Allows new (smaller) teams to add value, without understanding the entire infrastructure. 
- Moves the "infrastructure" concerns away from the application code -- we can standardize on monitoring etc. accross teams

**Pitfalls for Microservice approach**  

- If the services are too small, or too dependent on many other services:
   1. Debugging with be hard - hard to understand the process
   2. Infrastrucutre overhead will be high - wasted CPU/Memory just for running process
   3. Latency will be high
   4. Reliability will be harder to achieve
   5. Data consistence and integrity may be harder to achieve
   6. Local development workflow will be slow and complicated

#### What do we want to achieve?

1. End-product should be highly coherent
   - Design/UX
   - Process flow
   - Data consistency (e.g. common profile etc.)

2. Services should be developed and deployed individually
   - Front-end
   - Processes / integrations
   - Data

At a high level, there should be easy communication and high coherence between teams. At a low level, there should be very little inter-team dependencies.

#### Can we find a sweet spot?

- Microservices not nanoservices: "Biggish" microservices that are split to reflect concerns
  > Business domain boundaries
  > Technical: process (business logic, integration), data (source of truth), UI (application, end-user)

- Main principals: high cohesion, low coupling
  Interpretation - avoid splitting services that have a lot of two-way communication (probably the same business domain).