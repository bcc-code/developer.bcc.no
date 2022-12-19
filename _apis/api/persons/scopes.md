# Persons API Scope definitions

## List of all available scopes with example payloads

1. persons#read
```json
{
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",
    "firstName": "John",
    "middleName": "Bernard",
    "lastName": "Doe",
    "displayName": "John Bernard Doe",
    "age": 30,
    "birthDate": "1990-01-01",
    "diseasedDate": "",
    "gender": "Male",
    "email": "john.doe@example.com",
    "emailVerified": true,
    "cellPhone": "+474111111",
    "cellPhoneVerified": true,
    "homePhone": "+472722222",
    "address": {
        "address1": "testAddress3",
        "address2": "waddw",
        "address3": "",
        "city": "Ås",
        "countryIso2Code": "no",
        "countryName": "Norway",
        "countryNameNative": "Norge",
        "postalCode": "1234",
        "region": ""
    }
}
```

2. persons.name#read
```json
{
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",
    "firstName": "John",
    "middleName": "Bernard",
    "lastName": "Doe",
    "displayName": "John Bernard Doe"
}
```

3. persons.birth_date#read
```json
{
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",
    "age": 30,
    "birthDate": "1990-01-01"
}
```

4. persons.deceased_date#read
```json
{
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",
    "diseasedDate": "2018-01-01"
}
```

5. persons.gender#read
```json
{
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",
    "gender": "Male"
}
```

6.  persons.email#read
```json
{
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",
    "email": "john.doe@example.com",
    "emailVerified": true
}
```

7. persons.phone#read
```json
{
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",
    "cellPhone": "+474111111",
    "cellPhoneVerified": true,
    "homePhone": "+472722222"
}
```

8.  persons.address#read
```json
{
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",
    "address": {
        "address1": "testAddress3",
        "address2": "waddw",
        "address3": "",
        "city": "Ås",
        "countryIso2Code": "no",
        "countryName": "Norway",
        "countryNameNative": "Norge",
        "postalCode": "1234",
        "region": ""
    }
}
```

9.  persons.national_ids#read
```json
{
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",
    "nationalIDs": [
      {
        "countryIso2Code": "NO",
        "id": "1234123412"
      }
    ]
}
```
10.  persons.affiliations#read
```json
{
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",
    "affiliations": [
      {
        "active": true,
        "orgID": 123,
        "orgType": "Church",
        "type": "Participant",
        "validFrom": "2020-01-01T08:01:23.456Z"
      }
    ]
}
```
11.  persons.relations#read
```json
{
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",
    "relations": [
      {
        "type": "Child",
        "ValidFrom": "2010-10-10",
        "PersonID": 10001,
      },

      {
        "type": "Spouse",
        "ValidFrom": "2008-09-09",
        "PersonID": 10002,
      }
    ]
}
```
