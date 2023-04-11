import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { nexusSchema } from './graphql/schemaConfigNexus.js';
import { contextGQL } from './graphql/common/contextGQL.js';

// import dotenv from 'dotenv';
import * as dotenv from 'dotenv';
import mongodb from 'mongodb';
import router from './restroute.js';

dotenv.config();
if (process.env.DB_URI === null || process.env.DB_URI === undefined)
	throw new Error(' -- ' + process.env.DB_URI);

// const client = await mongodb.MongoClient.connect(process.env.DB_URI, {
const client = new mongodb.MongoClient(process.env.DB_URI);

// maxPoolSize: 50,
// catch(error => console.error(error));

try {
	// Connect to the MongoDB cluster
	await client.connect();

	const dblist = await client.db().admin().listDatabases();
	console.log(dblist);

	// Make the appropriate DB calls
	// await listDatabases(client);
} catch (e) {
	console.error(e);
} finally {
	await client.close();
}

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
	.use('/r', router)
	.use('*', (req, res) => res.status(404).json({ error: 'not found' }))
	.listen(4000);

console.log('running on :4000/graphql');

// mongodb.MongoClient.connect(process.env.DB_URI, {
// 	maxPoolSize: 50,
// }).catch(error => console.error(error));
// .then(async client => {
// 	app.listen(port, () => {
// 		console.log('listening on port 5000');
// 	});
// });
