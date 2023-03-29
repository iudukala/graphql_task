console.log('test');

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import schema from './schema';

// const schema = buildSchema(`
// type Query {
//     hello: String
// }
// `);

const root = {
	hello: () => {
		return 'hello world';
	},
};

const app = express();
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	}),
);
app.listen(4000);
console.log('running');
