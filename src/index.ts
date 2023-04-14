import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { nexusSchema } from './graphql/schemaConfigNexus.js';
import { contextGQL } from './graphql/common/contextGQL.js';
import dotenv from 'dotenv';
import { FruitModel } from './Fruit/mongooseFruitModel.js';
import { tempDataFruit } from './tempData.js';
import { mapToPersistenceModel } from './persistence/mapToPersistenceModel.js';
import { commitToPersistence } from './persistence/commitToPersistence.js';

// fetching environment variables set in the .env file and initializing the connection string var
dotenv.config();

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
	.use('*', (_, res) => res.status(404).json({ error: 'invalid' + res + _ }))
	.listen(4000);

console.log('running on :4000/graphql');

const initializeDBForTesting = () => {
	dotenv.config();

	FruitModel.collection.drop();
	tempDataFruit.forEach(fruit => commitToPersistence(fruit, contextGQL.DB_URI));
};
initializeDBForTesting();
