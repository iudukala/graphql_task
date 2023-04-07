# assumptions & notes

- the mutations createFruitForFruitStorage() and storeFruitToFruitStorage() have the arguments 'limit' and 'amount' in them respectively. therefor i'm assuming that each "Fruit" has a maximum limit that can be stored and that the mutation storeFruitToFruitStorage additively increments the count by the value in the argument 'amount'.
- the fact that nexus requires --transpile-only to remove type checking is not a good approach. ide type safety is not sufficient. compiled even with type errors present. most of the time you only notice once that particular file is opened. too easy to miss. have to remove --transpile-only and run ocassionally to ensure no type errors
- found an issue where a typescript const enum wasn't being accepted by the omit utility function. worked as expected when using pick<> to select the fields required but didn't when trying to use it to exclude the fields to extract the required ones.
- the name of a fruit is required to be unique, ensured through a domain service. no need for a separate id field since name can be used for identification. however, using the name as the ID introduces two issues:

- would break the convention of having a globally unique identifier for each entity object
- would break consistency in the language used that domain driven design emphasizes as valuable. since the internal representation of each `Fruit` object would have it's name stored in the `id` field enforced by the base `Entity<T>` class. the graphql endpoint and everything on the frontend would refer to this as 'name' while internally it would be in a field named `id`.
- this could be partially fixed by storing the name in the 'id' field and exposing it outside the class as 'name' through a getter. or declare a new field in the subclass Fruit and add a new field `name` that mirrors `id`

- ideally, the approach to take would be to cater to the lowest common denominator. since there exist no entities in the system that use an identifier like a uuid, we could get rid of the `id` field in the entitiy base-class/superclass and use 'name'. but that would also violate the ddd principles since the entire objective is to have a structure that is extendable and scalable.

- another option was to copy the name from the fruit field to the id field and maintain two copies. not a major issue since all objects are immutable and fields are not changed individually.

- the issue with omit is not an issue with the behaviour of omit. it's to do with the behaviour in enums.
  https://github.com/microsoft/TypeScript/issues/40944

- switched to cons asserted object from enum. allows for a single source of truth and additional compiler checks. also avoids issues related to unexpected behaviours from enums
