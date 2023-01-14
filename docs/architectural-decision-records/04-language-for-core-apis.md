# 04 Language for core APIs

# Context 
After deciding the API model, we need to agree on implementation details.
This document is focusing on the language selection for the core APIs (person API, org API, Affilitaions API, profile API)

## Considerations

1. Type validation
2. Documentation API
3. Code maintenance/readability
4. Language popularity (libraries, community)
5. Testing
6. gRPC support

## Possible languages
We shouldn't be introducing any new languages to BCC IT so we're going to choose from 3 that are already used
1. Node js
2. C#
3. Golang

## Language comparison

### Node

#### Pros

- The team is familiar with it
- The most used language with most developers
- Language is easy to learn and understand
- Rich community with libraries allowing for testing, debugging, hot reloads
- Same language as in the frontend, so it allows for code sharing

#### Cons

- Higher latencies for API requests
- Loosely typed
- Stack traces are useless in async functions
- NPM packages are often compromised (bad for security)

#### Remarks

- It is possible to generate documentation and input validators from Typescript definitions

### C#

#### Pros

- Strongly typed
- Input validation and documentation out of the box
- Solid stack traces
- Official packages provide good security (entity framework)

#### Cons

- A lot of boilerplate
- Steeper learning code
- Not that well supported on VS Code
- More difficult to dockerize

#### Remarks

- Team has minimal experience with the language

### Go

#### Pros

- Strongly typed
- Compiles to binary
- Good testing framework
- Easy to dockerize
- Cross-platform support
- Best performance

#### Cons

- No experience in the team

#### Remark

- Media is satisfied with the language

# Decision 
Because of insufficient experience with Go and C# we cannot make a decision 100% certainly, but based on research we feel like go is more likely to be the right choice, so we're going to implement the first API with go.
If the results are not satisfactory then we're going to re-evaluate

## Re-evaluation (Jan 2023)
**C# and .Net 7** was reevaluated to be the preferred framework for API development for member applications based on the following:
* More developers who are familiar with .Net than Go
* Better support for observability (e.g. in Application Insights)
* Already in use in other projects / teams - using the same technology will increase the likelyhood of knowledge sharing and interoperabilty via .Net SDKs

# Consequences

- We need to learn a new language which is going to take some time and effort.

# Alternatives 

- Node: We want to avoid the mess of loosely type language causing data integrity issues
- C#: Also a good alternative, but with our current knowledge it's better to go with Go (re-evaluated, see above)

