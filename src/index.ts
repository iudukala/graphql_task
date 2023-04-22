import dotenv from 'dotenv';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { FruitRepo } from './Fruit/FruitRepository.js';
import { contextGQL } from './graphql/common/contextGQL.js';
import { nexusSchema } from './graphql/schemaConfigNexus.js';

// fetching environment variables set in the .env file and initializing the connection string var
dotenv.config();
// await initializeDBForTesting(process.env['DB_URI']);

FruitRepo.ATOMIC_TRANSACTION_FLAG = true;

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
