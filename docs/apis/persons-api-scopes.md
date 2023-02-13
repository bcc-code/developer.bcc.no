# Persons API Scope definitions

## List of available scopes

> The fields `personID` and `lastChangedDate` is always included in all scopes

| Access                         | Scope                        | Description                                                                                         |
|--------------------------------|------------------------------|-----------------------------------------------------------------------------------------------------|
| Person data                    | `persons#read`               | Combined access to: `Name`, `Birth date`, `Deceased date`, `Gender`, `Email`, `Phone` and `Address` |
| Name                           | `persons.name#read`          | Access to `firstName`, `middleName`, `lastName` and `displayName`.                                  |
| Birth date                     | `persons.birth_date#read`    | Access to `age` and `birthDate`.                                                                    |
| Deceased date                  | `persons.deceased_date#read` | Access to `diseasedDate`.                                                                           |
| Gender                         | `persons.gender#read`        | Access to `gender`.                                                                                 |
| Email                          | `persons.email#read`         | Access to `email` and `emailVerified`.                                                              |
| Phone                          | `persons.phone#read`         | Access to `cellPhone`, `cellPhoneVerified`, `homePhone`.                                            |
| Address                        | `persons.address#read`       | Access to `address`.                                                                                |
| National identifcation numbers | `persons.national_ids#read`  | Access to `nationalIDs`.                                                                            |
| Affiliations                   | `persons.affiliations#read`  | Access to `affiliations` .                                                                          |
| Relations                      | `persons.relations#read`     | Access to `relations`.                                                                              |



## List of example payloads

### Person data: `persons#read`
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

### Name: `persons.name#read`
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

### Name and email: `persons.name#read persons.email#read`
  ```json
  {
    "personID": 10000,
    "lastChangedDate": "2019-01-01T20:10:15.123Z",

    "firstName": "John",
    "middleName": "Bernard",
    "lastName": "Doe",
    "displayName": "John Bernard Doe",

    "email": "john.doe@example.com",
    "emailVerified": true,
  }
  ```

### Address: `persons.address#read`
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

### National identifcation numbers: `persons.national_ids#read`
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

### Affiliations: `persons.affiliations#read`
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

### Relations: `persons.relations#read`
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
