---
description: >-
  There would be a full day workshop where we make a strategy for Open APIs and
  specifically the authentication.
---

# BCC Open APIs Workshop

## Approach

The idea would be that each team leader comes with some user scenarios for their application, as well as potentially how they would like to use data from other applications \(especially Members\)

In addition we would look at some reference architectures \(e.g. Microsoft Graph, Shopify API, Facebook API, Google API, Oslofjord\) as a guide.

## Goal

1. How to authenticate end-users \(e.g. OpenID connect\)
2. How to authenticate service-to-service \(e.g. OAuth\)
3. How to propogate user context between services \(e.g. end-user token, or system token + user parameter\)
4. Network security for internal and external services
5. API Gateway for BCC vs. API Gateway per application vs. completely independent microservices
6. How to manage system integration permissions \(as opposed to user specific permissions\)
7. How to support micro-frontend \(widget\) scenarios
8. How to provision clients \(self service?\)
9. Client libraries - which languages? swagger
10. Protocols / styles? REST, OData, Graphql, GRPC
11. How to support event based communication \(internally, externally\) - webhooks, message brokers, event streams etc.?

### BCC Membership Api Use Cases

1. BUK as an external organization want's access to BCC's members api to synchronize personal data of the BCC members that gave consent for BUK to handle their data. The fields BUK needs access to are. firstName, lastName, email and address.
2. BCC.Media want to sync all the members data in order to display their displayName and church during conference meetings.
3. BCC has a client to the members api where BCC members can log into. The client want to be able to do actions in the system based on the logged in member's permission.

### Brunstad TV Api Use Cases

1. -
2. -

### MyShare Api Use Cases

1. -
2. -

### BMM Api Use Cases

1. -
2. -

Decisions

1. IDP will support scopes which should bound to a resource \(with the exception of OIDC scopes\)
2. All applications need to validate scopes
3. Scopes are very high level permissions to a set of data or functionality
4. In principal resource owners need to approve a client's use of a particular scope.
5. Clients should always be bound to a specific organization.
6. OIDC & OAuth 2.0 are preferred clients
7. Scopes are permissions that the user grants to a client which the client can perform on his/her behalf
8. In the case of service users, the resource owner approves 
9. 1 proxy per product
10. Keep internal services private \(not public to internet\), but don't assume privacy -- i.e. authenticate internal requests too.
11. Method to request client should be documented.
12. Could also provide a method for requesting API tokens to get "my" data without 
13. Should setup a complete sandbox environment with easy provisioning of clients.





