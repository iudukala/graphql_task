import { contextGQL } from '../graphql/common/contextGQL.js';
import dotenv from 'dotenv';
import { FruitModel } from '../Fruit/mongooseFruitModel.js';
import { tempDataFruit } from '../tempData.js';
import { commitToPersistence } from '../persistence/commitToPersistence.js';
import { connectDB } from '../persistence/connectDB.js';
import { mapToPersistenceModel } from '../persistence/mapToPersistenceModel.js';
import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';

/**
 * clears out data and adds
 *
 * @param DB_URI database connection uri
 */
export async function initializeDBForTesting(DB_URI: string | null | undefined) {
	// dotenv.config();
	await connectDB(DB_URI);

	try {
		await FruitModel.collection.drop();
	} catch (exception) {
		console.log(exception);
		// i[f (exception instanceof MongoServerError)
		// else throw exception;
	} finally {
		mongoose.connection.on('connected', async () => {
			await FruitModel.insertMany([...tempDataFruit.map(mapToPersistenceModel)]);
		});
	}
	// await FruitModel.collection.drop();
	// FruitModel.insertMany([...tempDataFruit.map(mapToPersistenceModel)]);

	mongoose.connection.close();

	// try {
	// 	await FruitModel.collection.drop();
	// } finally {
	// 	FruitModel.insertMany([...tempDataFruit.map(mapToPersistenceModel)]);
	// 	// tempDataFruit.forEach(fruit => commitToPersistence(fruit, contextGQL.DB_URI));
	// }
}
