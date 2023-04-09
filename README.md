# assumptions & notes

- nexus requires --transpile-only to remove type checking only leaves ide type checks.

- found an issue where a typescript const enum wasn't being accepted by the omit utility function. worked as expected when using pick<> to select the fields required but didn't when trying to use it to exclude the fields to extract the required ones. (turned out to be an issue with enums. const enums are static enough to be inlined at compilation so i don't see why they're insufficient for type construction. switched to const asserted object
  )

- [no] the name of a fruit is required to be unique, ensured through a domain service. no need for a separate id field since name can be used for identification. however, using the name as the ID introduces two issues:

- would break the convention of having a globally unique identifier for each entity object

- would break consistency in the language used that domain driven design emphasizes as valuable. since the internal representation of each `Fruit` object would have it's name stored in the `id` field enforced by the base `Entity` class. the graphql endpoint and everything on the frontend would refer to this as 'name' while internally it would be in a field named `id`.

- this could be partially fixed by storing the name in the 'id' field and exposing it outside the class as 'name' through a getter. or declare a new field in the subclass Fruit and add a new field `name` that mirrors `id`

- ideally, the approach to take would be to cater to the lowest common denominator. since there exist no entities in the system that use an identifier like a uuid, we could get rid of the `id` field in the entitiy base-class/superclass and use 'name'. but that would also violate the ddd principles since the entire objective is to have a structure that is extendable and scalable.

- another option was to copy the name from the fruit field to the id field and maintain two copies. not a major issue since all objects are immutable and fields are not changed individually.

- the issue with omit is not an issue with the behaviour of omit. it's to do with the behaviour in enums.
  <https://github.com/microsoft/TypeScript/issues/40944>

- switched to cons asserted object from enum. allows for a single source of truth and additional compiler checks. also avoids issues related to unexpected behaviours from enums

- i commit a lot when i'm building something while learning. and to avoid having dozens of files changed across each commit to make diffing between commits easier to debug something

- nexus js doesn't seem to support esm. when package.json has type: "module" and

- insufficient esm support from jest. got esm modules to load with code transforms from ts-jest plugin but jest still fails when attempting to access import.meta global
  "error TS1343: The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'" when tsconfig has 'module' set to 'es2020'. not an issue with tsconfig visibility to jest since it respects other flags set in it.
