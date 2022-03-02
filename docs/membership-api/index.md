---
title: BCC Sign-on & Membership System
---


# BCC Members Data Access (BETA)
**_NB: Please note that the members API is still in BETA, this means we still might make some changes to the data structure without versioning the API_**
<br />
<br />
This documentation is aimed at you as a Developer/Technical Administrator for your organization. The documentation here provides documentation on all the ways possible to integrate with BCC's membership system. 

**url: [https://members.bcc.no](https://members.bcc.no)** 
<br />
**swagger: [https://members.bcc.no/docs](https://members.bcc.no/docs)**

## Menu
- [Home](index)
- [API integration](api-integration)
- [Authentication](authentication)
- [Webhooks integration](webhooks)
- [Data Structures and Scopes](data-structures-and-scopes)
- [Single Sign Out](single-sign-out)

## Getting Started
1. Write to [it@bcc.no](mailto:it@bcc.no) requesting the "Technical Administrator" role
2. Log into [https://members.bcc.no](https://members.bcc.no) and configure your application settings
3. In the application settings you can also apply for the scopes you require for your [organization](https://members.bcc.no/organisations)
4. You will be able use the scopes that has been approved for your application

# Concepts and Roles
### Members
"Members" is the name for BCC's membership system. This is where all the members's data is residing

### Technical Admin
The technical admin is a person that is registered in members that has a role called "Technical Administrator". This person has access to the system to manage the application for his organization and to do things like applies for scopes etc. _(Are you the technical admin for your organization? Write an email to [it@bcc.no](mailto:it@bcc.no) to get access for your organization)_

### Organization
All organizations that has a relationship to BCC, for example because they are dependent on the members data, will be registered in Members as an organization

### Application
An Organization can have one or more applications registered that are attached to that organization.

### Scope
A scope is a permission for your application for example the `members.read_membership` scope will give you access to read fields related to the members membership. See [Data Structures and Scopes](data-structures-and-scopes.md)

### Consent
A consent is where the end user explicitly approves the scopes your application has access to. For example let's say an application called _X_ got access to the `members.read_membership` scope. Now, lets's say we have a member called _Philly Dally_, Application X now wants to read the memberships of Philly Dally, but he still won't be able to read Philly Dally's membership until Philly Dally has explicitly given him consent to do so.


