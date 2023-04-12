import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { nexusSchema } from './graphql/schemaConfigNexus.js';
import { contextGQL } from './graphql/common/contextGQL.js';

// import dotenv from 'dotenv';
import * as dotenv from 'dotenv';
import mongodb from 'mongodb';
import router from './restroute.js';

import * as mongoose from 'mongoose';
import { FruitKey } from './Fruit/enum_fruitKey.js';
import { FruitTypeGQL } from './graphql/nexus_types/FruitTypeGQLNX.js';

dotenv.config();

export const DB_URI = 'DB_URI' as const;

if (process.env[DB_URI] === null || process.env[DB_URI] === undefined)
	throw new Error(' -- ' + process.env.DB_URI);

await mongoose.connect(process.env[DB_URI]);

const FruitModel = mongoose.model(
	'Fruit',
	new mongoose.Schema<FruitTypeGQL>({
		name: String,
		description: String,
		limit: Number,
		amount: Number,
	}),
);

const x = new FruitModel({
	names: 'lemon2',
	description: 'something',
	limit: 10,
	amount: 20,
});

console.log(await x.save());

if (process.env[DB_URI] === null || process.env[DB_URI] === undefined)
	throw new Error(' -- ' + process.env.DB_URI);

// const client = await mongodb.MongoClient.connect(process.env.DB_URI, {
const client = new mongodb.MongoClient(process.env['DB_URI']);

// try {
// Connect to the MongoDB cluster
// await client.connect();

// const dblist = await client.db().admin().listDatabases();
// console.log(dblist);

// const dblist2 = await client.db().admin().listDatabases();
// console.log(dblist2);

// const dbConnection = client.db();
// const t = await dbConnection.collection('restaurants').insertOne({
// 	borough: 'some',
// 	cuisine: 'asfdasdf',
// 	name: 'searchable name x',
// });

// 	const x = `{"_id":{"$oid":"5eb3d669b31de5d588f48c38"},"address":{"building":"461","coord":[{"$numberDouble":"-74.138492"},{"$numberDouble":"40.631136"}],"street":"Port Richmond Ave","zipcode":"10302"},"borough":"Staten Island","cuisine":"Other","grades":[],"name":"Indian Oven","restaurant_id":"50018994"}`;
// 	console.log(t);

// 	// Make the appropriate DB calls
// 	// await listDatabases(client);
// } catch (e) {
// 	console.error(e);
// } finally {
// 	await client.close();
// }

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
