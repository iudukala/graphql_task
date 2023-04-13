import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { nexusSchema } from './graphql/schemaConfigNexus.js';
import { contextGQL } from './graphql/common/contextGQL.js';
import dotenv from 'dotenv';
import * as mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

// fetching environment variables set in the .env file and initializing the connection string var
// dotenv.config();
// if (process.env['DB_URI'] === null || process.env['DB_URI'] === undefined)
// 	throw new Error('database connection string empty');
// export const DB_URI: string = process.env['DB_URI'];

// This will create an new instance of "MongoMemoryServer" and automatically start it
// const mongod = await MongoMemoryServer.create();

// export const DB_URI = mongod.getUri();

mongoose.connect(contextGQL.DB_URI);
// /?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"

// The Server can be stopped again with
// await mongod.stop();

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
