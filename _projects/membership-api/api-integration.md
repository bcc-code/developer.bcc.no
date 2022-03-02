# API Integration
**_NB. We recommend that you use [webhooks](webhooks.md) to keep your system up to date with the Members data, as this will relieve the load from the API. But you are still welcome to use the API_**
## Menu
- [Home](index)
- [API integration](api-integration)
- [Authentication](authentication)
- [Webhooks integration](webhooks)
- [Data Structures and Scopes](data-structures-and-scopes)
- [Single Sign Out](single-sign-out)


## Integrating with the Members API
Please read the [Getting Started](index.md) section before going through this page. Once scopes have been approved for your client (application) you can integrate with the members api.
 
## Authentication and Authorization to the API
It is currently only possible to get access to the API via an API Key. OAuth2 support will come soon.

## API-key
1. To get access to your API key, please navigate to your [organization](https://members.bcc.no/organisations) click on the "Applications" tab, then on the application you want to work with and then the "Data Access" tab
![image](https://user-images.githubusercontent.com/12196246/126334453-3cad28e8-b8f5-4156-8073-a79c4d7e647e.png)
2. On the "Data Access" page you should see the section for API Keys
![image](https://user-images.githubusercontent.com/12196246/126334964-374e824b-8447-4a38-8b9b-a82becd6259a.png)

## Code snippets
For these example we are using the [node-fetch](https://www.npmjs.com/package/node-fetch) npm package
<br />
### Example 1 - Get a person given his personID
```js
const fetch = require('node-fetch');
    try {
        let httpResponse = await fetch('https://members.bcc.no/person?personID=12345',
            {
                method: 'get',
                headers:
                    {   'Content-Type': 'application/json',
                        'x-access-token':'API-KEY-HERE'
                    }
            })

        const result = await httpResponse.json()
        const person = result.data[0]
        console.log('Person retrieved from the members api', JSON.stringify(person))

    } catch (error) {
        console.log(error.message)
    }
```

### Example 2 - Get all people from Oslo/Follo (churchID = 69)

```js
const fetch = require('node-fetch');
    try {
        let httpResponse = await fetch('https://members.bcc.no/person?churchID=69&$limit=50&$skip=0',
            {
                method: 'get',
                headers:
                    {   'Content-Type': 'application/json',
                        'x-access-token':'API-KEY-HERE'
                    }
            })

        const result = await httpResponse.json()
        const everybodyFromOsloFollo = result.data
        console.log('Fifty people retrieved in Oslo/Follo from the members API', JSON.stringify(everybodyFromOsloFollo))

    } catch (error) {
        console.log(error.message)
    }
```

## OAuth2
Coming soon

