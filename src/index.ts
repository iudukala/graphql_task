import dotenv from 'dotenv';
// import express from 'express';
// import { graphqlHTTP } from 'express-graphql';
import { FruitRepo } from './Fruit/FruitRepository.js';
import { DomainEventManager } from './core/DomainEventManager.js';
// import { nexusSchema } from './graphql/schemaConfigNexus.js';
import { FruitMutatedEvent } from './Fruit/events/FruitMutatedEvent.js';
import { logEventSummary } from './Fruit/events/logEventSummary.js';
// import { buildSchema } from 'graphql';
// import { createSchema, createYoga } from 'graphql-yoga';
import { readFileSync } from 'fs';
import path from 'path';

// fetching environment variables set in the .env file and initializing the connection string var
dotenv.config();

// initializing the database connection string
const DB_URI = process.env['DB_URI'];
// const DB_URI =
// 'mongodb+srv://dbuser:41SY2qEEWqAMkSs2@cluster0.lerzwsa.mongodb.net/test?retryWrites=true&w=majority';
if (DB_URI === null || DB_URI === undefined) throw new Error('database connection string empty');

// setting flag for using mongodb transactions. (cannot use transactions if not part of replica set)
FruitRepo.ENABLE_TRANSACTIONS = false;

// adding trivial event handler for the 'fruit modified' event
DomainEventManager.register(logEventSummary, FruitMutatedEvent.name);

// starting up domain event manager cron job that checks for events in transactional outbox
DomainEventManager.init(DB_URI);

// console.log(readFileSync(path.join('graphql', 'schema.graphql')));
// console.log(readFileSync(path.resolve(__dirname, './index.txt')).toString());

// import fs from "node:fs/promises";

// const fileURL = new URL('index.txt', import.meta.url);
// const fileURL = new URL(path.join('graphql', 'schema.graphql'), import.meta.url);
const fileURL = new URL('graphql/schema.graphql', import.meta.url);
console.log(readFileSync(fileURL, 'utf8'));

//  './graphql/schema.graphql'));

// const schema = createSchema({
// 	typeDefs: readFileSync(path.join('graphql', 'schema.graphql')),
// 	// , { encoding: 'utf-8' }),
// 	// 	type Query{
// 	// 		hello: String
// 	// 	}
// 	// `,
// 	resolvers: {
// 		Query: {
// 			hello: () => 'world',
// 		},
// 	},
// });

// listening for requests
// express().use(createYoga({ schema }).graphqlEndpoint, createYoga({ schema }));

// const yoga = createYoga({ schema });
// express().use(yoga.graphqlEndpoint, yoga).listen(4000);
// .use(
// 	'/graphql',
// 	graphqlHTTP({
// 		schema: nexusSchema,
// 		graphiql: true,
// 		context: {
// 			DB_URI: DB_URI,
// 		},
// 		pretty: false,
// 	}),
// )
// .listen(4000);

console.log('running on :4000/graphql');

// import { readFileSync } from 'fs';

// // Note: this uses a path relative to the project's
// // root directory, which is the current working directory
// // if the server is executed using `npm run`.
// const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

// const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
