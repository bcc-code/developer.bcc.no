# BCC Events

This repository contains types for [CloudEvents](https://cloudevents.io) issued by BCC.

The "source of truth" for the event data format is in the form of [Google Protocol Buffers](https://github.com/protocolbuffers/protobuf).

See [proto/README.md](proto) for more information about the messages used to describe CloudEvents.

# Cloud PubSub
Since most of our application are hosted in Google we use Cloud PubSub for publishing and subscribing cloud events.

## Naming conventions

### Topic
`[service]-topic` (e.g. contribution-topic, membership-topic, event-topic)

### Subscription
`[publishing service]-[subscrybent service]-sub` (e.g. membership-contribution-sub, membership-event-sub)

A subscription needs to be unique per PubSub.

# CloudEvents in this repository
This repository contains definitions for the following CloudEvents:

| Service | Schemas | PubSub Topic | Types |
|---------|---------|--------------|-------| 
| Contribution Registry| [Proto](proto/events/contribution/registry/v1/events.proto) | contribution-topic | CloudEvent Type: `bccCode.events.contribution.registry.v1.ContributionCreatedEvent` `bccCode.events.contribution.registry.v1.ContributionDeletedEvent` |
| Competency Registry | [Proto](proto/events/contribution/competencyRegistry/v1/events.proto) | contribution-topic | CloudEvent Type: `bccCode.events.contribution.competencyRegistry.v1.ObjectCreatedEvent`|
| Person Administration | [Proto](proto/events/membership/personAdministration/v1/events.proto) | membership-topic | CloudEvent Type: `bccCode.events.membership.admin.person.v1.PersonRevokedEvent`|
| Event Registration | [Proto](proto/events/event/registration/v1/events.proto) | event-topic | CloudEvent Type: `bccCode.events.event.registration.v1.PersonRegisteredEvent`|
