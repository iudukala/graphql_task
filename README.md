assumptions + notes

- the mutations createFruitForFruitStorage() and storeFruitToFruitStorage() have the arguments 'limit' and 'amount' in them respectively. therefor i'm assuming that each "Fruit" has a maximum limit that can be stored and that the mutation storeFruitToFruitStorage additively increments the count by the value in the argument 'amount'.
- the fact that nexus requires --transpile-only to remove type checking is not a good approach. ide type safety is not sufficient. compiled even with type errors present. most of the time you only notice once that particular file is opened. too easy to miss. have to remove --transpile-only and run ocassionally to ensure no type errors
- found an issue where a typescript const enum wasn't being accepted by the omit utility function. worked as expected when using pick<> to select the fields required but didn't when trying to use it to exclude the fields to extract the required ones.
- the name of a fruit is required to be unique, ensured through a domain service. no need for a separate id field since name can be used for identification
