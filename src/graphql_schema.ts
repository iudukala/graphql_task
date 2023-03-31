import { buildSchema } from 'graphql';

export default buildSchema(`
type Query {
    books: [Book]
}
type Query {
    hello: String
}
`);
