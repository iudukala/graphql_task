import { buildSchema } from 'graphql';

const graphql_schema = buildSchema(`
type Query {
    hello: String
}
`);

export default graphql_schema;
