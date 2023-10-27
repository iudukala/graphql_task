# requirements specified

> All code written should follow domain driven design

domain design pricinciples outlined by Khalil Stemmler in <https://khalilstemmler.com> and Martin Fowler in <https://martinfowler.com> have been followed to the best of my ability.

> When the fruit is created, updated, or deleted; a domain event should be emitted. The event has to guarantee at least once delivery.

each mutation event adds an entry to the transaction outbox, a separate collection in persistence. handlers are registerd through the domain events manager for event consumption that run at regular intervals. guaranteeing at least once delievery however, requires the use of transactions in mongodb, which is only available if the mongodb instance is a member of a replica set. transaction logic is implemented however and when connected to the mongodb atlast database instance (primary DB_URI in .env, and the default database outside testing), atomic transactions are performed to ensure atleast once delivery of the event to the transaction outbox

> The description of a fruit can't be beyond 30 letters:

ensured by using a value object in the domain entity `Fruit`

> The name of a fruit should be unique:

ensured through a check performed in a domain service before being committed to persistence

> The creation of a fruit should be done through a factory

implemented inside Fruit class

> The fruit should be retrieved through a Repository

a repository has been implemented (`FruitRepo`) that handles persistence layer mutations

> The fruit should be converted from a database object to a domain object and viceversa through mappers:

performed through static functions made available through a class

> Use Mongoose for your ORM

mongoose used

> Use Jest for your testing

jest used. (does not have esm support) also added tests to github actions

> Use <https://nexusjs.org> to automatically generate your GraphQL schemas

nexusJS used

<!-- # assumptions & notes -->

<!-- - the name of a fruit is required to be unique, which allows it to act as an identifier. a separate id is, however generated (an objectID since the domain is small and it's worth it for the easy interoperebility with mongodb). -->

<!-- - the `id` field could've been removed if the architecture were to cater to the lowest common denominator, since there are no other entity types other than `Fruit`. this would've violated the principles of ddd. -->

<!-- - [no] the name of a fruit is required to be unique, ensured through a domain service. no need for a separate id field since name can be used for identification. however, using the name as the ID introduces two issues: (+ using a uuid separately allows it to be uniquely identified even amoung different types of entities. useful?) -->

<!-- - would break the convention of having a globally unique identifier for each entity object -->

<!-- - would break consistency in the language used that domain driven design emphasizes as valuable. since the internal representation of each `Fruit` object would have it's name stored in the `id` field enforced by the base `Entity` class. the graphql endpoint and everything on the frontend would refer to this as 'name' while internally it would be in a field named `id`. -->

<!-- - this could be partially fixed by storing the name in the 'id' field and exposing it outside the class as 'name' through a getter. or declare a new field in the subclass Fruit and add a new field `name` that mirrors `id` -->

<!-- - ideally, the approach to take would be to cater to the lowest common denominator. since there exist no entities in the system that use an identifier like a uuid, we could get rid of the `id` field in the entitiy base-class/superclass and use 'name'. but that would also violate the ddd principles since the entire objective is to have a structure that is extendable and scalable. -->

<!-- - another option was to copy the name from the fruit field to the id field and maintain two copies. not a major issue since all objects are immutable and fields are not changed individually. -->

<!-- - switched to cons asserted object from enum. allows for a single source of truth and additional compiler checks. also avoids issues related to unexpected behaviours from enums -->

<!-- - i commit a lot when i'm building something while learning. and to avoid having dozens of files changed across each commit to make diffing between commits easier to debug something -->

<!-- - operating as if there's only one fruit with the same name. implement domain service -->

<!-- - assuming that the mutation storeFruitToFruitStorage(name: string, amount: int) is specifiying the count in storage to be incremented by. not the exact value that is to be stored in the 'amount' field in the record. -->

## issues faced

- found an issue where a const enum wasn't being accepted by the omit utility function in typescript. worked as expected when using pick<> to select the fields required but didn't when trying to use it to exclude the fields to extract the required ones. this turned out to be an issue with enums. const enums are static enough to be inlined at compile time so there should be no reason why they'd be insufficient for type construction. switched to using const asserted object <https://github.com/microsoft/TypeScript/issues/40944>

- insufficient esm support from jest. got esm modules to load with code transforms from ts-jest plugin but jest still fails when attempting to access import.meta global
  "error TS1343: The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'" when tsconfig has 'module' set to 'es2020'. not an issue with tsconfig visibility to jest since it respects other flags set in it.

- nexus js does not seem to support esm. even with all esm related compiler flags, the autogenerated artifacts use commonJS imports, forcing manual modification of import statements each time a modification is made to the graphql schema. automatic generation needs to be turned off afterwards to avoid nexusjs overwriting the modifications. (also, transpile-only flag)

- nexus does not have great documentation

- depending on when you encounter a bug while working with nexusJS, the autogenerated schema may not be recompiled after the last compilation. this means that any changes that require fetching data from the autogenerated files (like query/mutation arguments/types) may not be available within the resolver until the resolver can compile again, allowing the autogenerated artifacts to be compiled again.

## improvements

- better immutability

- consider implementing both a graphql server and a rest api

- check if helmet js usage is necessary

- currently the best approach seems to be to use graphql-yoga (instead of express-graphql which is deprecated) with express

- Trainer: name, birthday, experience_years

- all entity object keys are lowercase. consistency ensured through const asserted objects

- specify object structure: each object has an id field and a separate object named props that contain the entity's properties.

- each entity object has a
  - an assocaited DTO that acts as the intermediary between domain objects and persistence records (and a typescript type for a DTO object)
  - a result of this is that specific DTO props objects never carries an id, since it is stored outside the props object within the general DTO (object structure specified below)
  - this also removes the necessity of the 
  - an internal props type without the ID
  - the ID specified as it's own property outside the props

- object structure is as follows

```typescript
  DTO<EntityPropsDTO>:{
    // a string containing the id generated by persistence,
    id: string
    // the actual props data
    propsDTO: EntityPropsDTO
  }
```

- since the database is the source of truth for the data, the responsibility of generating the ID falls on to the database, which is fetched back from the server to update the domain object.

- ADD LOGGING; URGENT
