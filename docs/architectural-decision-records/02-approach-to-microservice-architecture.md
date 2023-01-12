# 02 Approach to Microservice API Architecture

## Context

There is a need to define how microservice APIs will be secured, deployed and documented and how they will communicate with eachother (internally and externally).

## Decision

### Auth

OAuth 2.0 access tokens should be used for course-grained authorization.
Reason: wide industry adoption. Zero-trust principle indicates that even internal services should authorize requests.
Undecided: whether to use one or multiple audiences. For user-facing APIs one audience would allow a microfrontend approach to development with multiple backends (this could also be acheived using a proxy). For security, different audiences would be more optimal.

### Communication

Mandatory: APIs should at the very least support HTTP and publish an Open API *v2* specification (swagger). 
Reason: Widely supported by 3rd party tools, and sufficient to generate clients etc.

Optional: they may additionally support gRPC endpoints (esp. for internal communication) -- which MAY be achieved using Dapr

Recommended: APIs should publish business events to a shared message broker (internally) and via webhooks (externally). Ideally, webhooks API can be provided as an infrastructure service.
Reason: support asynchronous, highly available and scalable workflows. Simpler to understand/implement than Event streaming.

To try: use Dapr as an abstraction for the shared message broker (pub/sub)

### Documentation

The following needs to be documented for all APIs:

1. Endpoints (swagger, gRPC, graphQL etc) including a description of the functionality provided by the endpoint
2. Error codes, status codes and Models for all endpoints
3. Models for asynchronous messages (Events, Commands, Requests etc)
4. Authentication scopes

Recommended: develop SDKs in the most common languages (c#, node, perhaps GO) which make both the endpoints and models easy to consume.

### Deployment

Deployment of services should be highly automated including unit testing. Approval processes may be manual.

Recommended: services should ideally be containerized and stateless to allow for migration between environments and more importantly horizontal scaling. 
An exception to this rule could be light weight cloud functions where the cost of reimplementing (if necessary) is low and the benefits of a lightweight approach is high.

## Consequences

### Containers based on Dapr  

Containers using Dapr to communicate currently need to be run:
1. Within the same network as other containers (for direct invocation, though not for pub/sub messaging)
2. Strictly speaking need to run on Kubernetes (or a VM) since there is no mature managed dapr environment
3. The widest offering of stable Dapr components is currently on the Azure cloud (equivelent GCP offerings are mainly in alpha or beta)


## Alternatives

1. Drop use of Dapr, and use Cloud Run to host services
