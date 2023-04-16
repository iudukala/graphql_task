import { FruitModel } from '../Fruit/mongooseFruitModel.js';
import { fruitSampleData } from './helpers/sampleDataFruit.js';
import { connectDB } from '../persistence/connectDB.js';
import { mapToPersistenceModel } from '../persistence/mapToPersistenceModel.js';
import mongoose from 'mongoose';

/**
 * clears out existing data and adds new
 *
 * @param DB_URI database connection uri
 */
export async function initializeDBForTesting(DB_URI: string | null | undefined) {
	await connectDB(DB_URI);

	try {
		const collectionExists = (await mongoose.connection.db.listCollections().toArray())
			.map(collection => collection.name)
			.includes(FruitModel.collection.collectionName);

		if (collectionExists) await FruitModel.collection.drop();
	} catch (exception) {
		console.error('test environment init failure: ' + exception);
	} finally {
		await FruitModel.insertMany([...fruitSampleData.map(mapToPersistenceModel)]);
	}
}
