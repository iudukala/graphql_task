import { buildSchema } from 'graphql';

export default buildSchema(`
type Query {
    hello: String
    fruits: [Fruit]!
}

type Fruit {
    id: ID!
    name: String!
    description: String
    amount: Int
}
`);
