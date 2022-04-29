# BCC Events

This repository contains types for [CloudEvents](https://cloudevents.io) issued by BCC.

The "source of truth" for the event data format is in the form of [Google Protocol Buffers](https://github.com/protocolbuffers/protobuf).

See proto/README.md for more information about the messages used to describe CloudEvents.

# CloudEvents in this repository
This repository contains definitions for the following CloudEvents:

| Value | Schemas | Types                                                                         |
|-------|---------|-------------------------------------------------------------------------------|
| Contribution Registry| [Proto](proto/events/contribution/registry/v1/events.proto) | CloudEvent Type: `bccCode.events.contribution.registry.v1.ObjectCreatedEvent` |
~~~~