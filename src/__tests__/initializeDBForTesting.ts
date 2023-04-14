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
 */
export async function initializeDBForTesting() {
	dotenv.config();
	await connectDB(contextGQL.DB_URI);

	try {
		await FruitModel.collection.drop();
	} catch (exception) {
		console.log(exception);
		// i[f (exception instanceof MongoServerError)
		// else throw exception;
	} finally {
		await FruitModel.insertMany([...tempDataFruit.map(mapToPersistenceModel)]);
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
