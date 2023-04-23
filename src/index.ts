import dotenv from 'dotenv';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { FruitRepo } from './Fruit/FruitRepository.js';
import { DomainEventManager } from './core/DomainEventManager.js';
import { nexusSchema } from './graphql/schemaConfigNexus.js';
import { FruitMutatedEvent } from './Fruit/events/FruitMutatedEvent.js';
import { logEventSummary } from './Fruit/events/logEventSummary.js';

// fetching environment variables set in the .env file and initializing the connection string var
dotenv.config();

// initializing the database connection string
const DB_URI = process.env['DB_URI_LOCAL'];
if (DB_URI === null || DB_URI === undefined) throw new Error('database connection string empty');

// setting flag for using mongodb transactions. (cannot use transactions if not part of replica set)
FruitRepo.ENABLE_TRANSACTIONS = false;

// starting up domain event manager cron job that checks for events in transactional outbox
DomainEventManager.init(DB_URI);

// adding trivial event handler for the 'fruit modified' event
DomainEventManager.register(logEventSummary, FruitMutatedEvent.name);

// listening for requests
express()
	.use(
		'/graphql',
		graphqlHTTP({
			schema: nexusSchema,
			graphiql: true,
			context: {
				DB_URI: DB_URI,
			},
			pretty: false,
		}),
	)
	.listen(4000);

console.log('running on :4000/graphql');
