import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { nexusSchema } from './graphql/schemaConfigNexus.js';
import { contextGQL } from './graphql/common/contextGQL.js';
import dotenv from 'dotenv';

// fetching environment variables set in the .env file and initializing the connection string var
dotenv.config();
// await initializeDBForTesting(process.env['DB_URI']);

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

