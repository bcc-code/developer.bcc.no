# Webhooks

### On webhook request structure

**Header** 
```
Accept: "application/json"
Method: "POST"
X-Service: "{service}"
X-Signature: "{signedSHA-256(action + payload + token)}"
```

**Body**
```json
{
	"action": "{resource}.{subresource?}.{event}",
	"idempotent": "{hash(action + payload)}",
	"ts": 1626167843704,
	"payload": {}
}
```


### Definitions:

- **service**: The name of the service sending this webhook, eg. Members
- **resource**: The resource name this webhook is triggered on, eg. Person
- **subsresource**: (optional) a child relationship of the main resource eg. Church
- **event**: The event that took place for this webhook to be triggered, eg. Updated
- **signature**: The `action` and `payload` signed by a shared token between the `service` and the `receiver`
- **idempotent**: A simple md5 hash of the `action` and `payload` to use as an idempotent key
- **ts**: The timestamp this event was triggered
- **payload**: The actual data of the resource either in full or in partial depending on the `event`


### Example

Header
```
Accept: "application/json"
Method: "POST"
X-Service: "Members"
X-Signature: "4684284F6637F831C24FF6FDF6022BB61612BAF59ABADBD4A1C00FE72094EA9E"
```

Body
```json
{
  "action": "User.Church.Updated",
  "idempotent": "1A099C93A0E29129899A01C61B05C8DB",
  "ts": 1626167843704,
  "payload": {
    "id": 1231,
    "fullname": "John Doe",
    "churchId": 32,
    "church": {
      "id": 32,
      "name": "Oslo"
    }
  }
}
```

## Considerations

**Return a 2xx status code quickly** 
To acknowledge receipt of an event, your endpoint must return a 2xx HTTP status code to The Service. All response codes outside this range, including 3xx codes, indicate to The Service that you did not receive the event.

If The Service does not receive a 2xx HTTP status code, the notification attempt is repeated. After multiple failures to send the notification over multiple days, The Service marks the event as failed and stops trying to send it to your endpoint. After multiple days without receiving any 2xx HTTP status code responses, The Service emails you about the misconfigured endpoint, and automatically disables your endpoint soon after if unaddressed.

Because properly acknowledging receipt of the webhook notification is so important, your endpoint should return a 2xx HTTP status code prior to any complex logic that could cause a timeout.
