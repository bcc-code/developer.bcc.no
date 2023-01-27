# Auth0 scope naming convention

## Context 
 - As we decided to use Oauth as standard mean of authorization, we should align on how are we going to name our scopes
 
## Propositions
- [Jakub] ```<VERB>:<ENTITY>.<SUBENTITY>```, e.g. ```read:org```, ```read:person.email```
- [Philip previously]: ```<SYSTEM>.<ENTITY/SUBENTITY>_<VERB>```, e.g. ```members.email_read```
- [Reng]: ```[<TENANT>:]<ENTITY>.<SUBENTITY>:<VERB>```, e.g. ```org:read```, ```bccoslofollo:person.email:read``` , ```bcctonsberg:registrations:admin```. Alternatively TENANT could be it's own scope e.g. ```bccpoland``` which is used in _combination_ with other scopes.

## Decision 
`<Entity>[.<SubEntity>]#<Permission>`

For parsing we use
- "." to determine scope levels. 
- scopes always goes from big (non-ambiguous) to small (eg. brunstadtv.search_history#read, or person.address.firstline#write)
- "#" to prefix ability/permission level

For reading we use (snakecase)
- "_" simply to make things more readable
- lowercase only

Scopes and permissions are defined and configured by Terraform and shouldn't be maintained manually.

## Consequences 
See conversation below.

## Alternatives 
See conversation below.
