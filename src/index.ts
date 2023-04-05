import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import GQLNXSchema from './graphql/schemaConfigNexus';
import { gqlContext } from './graphql/gqlContext';

express()
	.use(
		'/graphql',
		graphqlHTTP({
			schema: GQLNXSchema,
			graphiql: true,
			context: gqlContext,
			pretty: false,
		}),
	)
	.listen(4000);

console.log('running on :4000/graphql');
