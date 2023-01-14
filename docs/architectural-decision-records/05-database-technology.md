# 05 Database Technology

## There are 2 types or databases that are considered:
1. Relational
2. Document
   - MongoDB
   - Firestore
   - CosmosDB
   - ArangoDB

## Considerations
1. Costs
2. Security
3. Governance (offboarding of team members)
4. Scaling
5. Community
6. Learning curve
7. Redundancy
8. Development speed (migrations, containerized)
9. Data integrity
10. Performance
11. Querying features

## Database Comparison

### Relational
#### Pros

- Guaranteed data integrity
- Easy to learn and widely used
- Large community
- Full sorting and filter capabilities
- Likely to be more performant for join operations

#### Cons

- Azure SQL Database is the only mainstream scalable solution
- Time consuming migrations

### Document
#### Pros

- Existing experience with MongoDB
- High development speed
- Most support serverless scaling
- Learning curve is not steep
- Likely to be more performant for simple read/write operations

#### Cons

- Easily lose data integrity
- Tooling is not standardized (querying, emulating)

## Summary

After lining up the considerations for Relational and Document DBs we come to our final candidates:

1. Azure SQL Database serverless
2. MongoDB (Serverless is in preview and not governed)
3. CosmosDB with Mongo API (Not full support of mongo API, weak data integrity)
4. Firestore (Weak data integrity, limited querying)
5. ArangoDB (Not serverless, small community)
6. CockroachDB, PlanetScale (Not mainstream, lacks governance)

# Decision 

1. For the source of truth APIs we're going to use Azure Serverless SQL Database
   1. Mainstream solution
   2. Fits serverless needs
   3. Forces good data integrity
2. For query API we're suggest going for a document database with strong search and querying capabilities
   1. MongoDB looks like a promising option, but we need more research to be sure
   2. Other options include ArangoDB, Elastic Search

## Re-evaluation (Jan 2023)
* After closer consideration, it appears that the pricing for Azure Serverless SQL is high - despite a "serverless" model. Azure Serverless SQL is a good fit for workloads that don't run often (e.g. daily datawarehous processing).
* **Postgresql** has now been selected as the go-to database technology for relational databases. It is cross-platform, supported on major clouds and doesn't have the same licening overhead as Microsoft SQL. It also outperforms Microsoft SQL in benchmarks. Note that postgresql also supports JSON columns and querying and could be used for simple document database needs too.

# Consequences 

- Slower development, especially when migration is needed
- We need to test scaling performance
- Team needs to get familiar with SQL

# Alternatives 

Document databases where not chosen for the source of truth APIs because;
- they risk losing data integrity
- they often lack serverless capabilities
- sometimes lack community

CockroachDB / PlanetScale
- Are not mainstream providers
- No big name governance system
