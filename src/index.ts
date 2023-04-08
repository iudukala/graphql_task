import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { nexusSchema } from './graphql/schemaConfigNexus.js';
import { contextGQL } from './graphql/contextGQL.js';

express()
	.use(
		'/graphql',
		graphqlHTTP({
			schema: nexusSchema,
			graphiql: true,
			context: contextGQL,
			pretty: false,
		}),
	)
	.listen(4000);

console.log('running on :4000/graphql');
