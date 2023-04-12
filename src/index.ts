import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { nexusSchema } from './graphql/schemaConfigNexus.js';
import { contextGQL } from './graphql/common/contextGQL.js';
import dotenv from 'dotenv';
import * as mongoose from 'mongoose';

// fetching environment variables set in the .env file and initializing the connection string var
dotenv.config();
if (process.env['DB_URI'] === null || process.env['DB_URI'] === undefined)
	throw new Error('database connection string empty');
export const DB_URI: string = process.env['DB_URI'];

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
