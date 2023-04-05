assumptions:

* the mutations createFruitForFruitStorage() and storeFruitToFruitStorage() have the arguments 'limit' and 'amount' in them respectively. therefor i'm assuming that each "Fruit" has a maximum limit that can be stored and that the mutation storeFruitToFruitStorage additively increments the count by the value in the argument 'amount'.
* the fact that nexus requires --transpile-only to remove type checking is not a good approach. ide type safety is not sufficient