import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import gql_schema from './graphql_schema';


const root = {
	hello: () => {
		return 'hello world';
	},
};

const app = express();
app.use(
	'/graphql',
	graphqlHTTP({
		schema: gql_schema,
		rootValue: root,
		graphiql: true,
	}),
);
app.listen(4000);

console.log('running');
