import { contextGQL } from '../graphql/common/contextGQL.js';
import dotenv from 'dotenv';
import { FruitModel } from '../Fruit/mongooseFruitModel.js';
import { tempDataFruit } from '../tempData.js';
import { commitToPersistence } from '../persistence/commitToPersistence.js';
import { connectDB } from '../persistence/connectDB.js';
import { mapToPersistenceModel } from '../persistence/mapToPersistenceModel.js';
import mongoose from 'mongoose';
import { MongoError, MongoServerError } from 'mongodb';

/**
 * clears out data and adds
 *
 * @param DB_URI database connection uri
 */
export async function initializeDBForTesting(DB_URI: string | null | undefined) {
	await connectDB(DB_URI);

	try {
		await FruitModel.collection.drop();
	} catch (exception) {
		if (exception instanceof MongoError) console.log(exception);
		// else throw exception;
	} finally {
		await FruitModel.insertMany([...tempDataFruit.map(mapToPersistenceModel)]);
	}

	mongoose.connection.close();
}
