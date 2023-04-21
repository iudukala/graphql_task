import { FruitModel } from '../../infrastructure/persistence/fruitModel.js';
import { fruitSampleData } from '../data/sampleDataFruit.js';
import { connectDB } from '../../infrastructure/persistence/connectDB.js';
import mongoose from 'mongoose';
import { FruitMapper } from '../../Fruit/FruitMapper.js';

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
		await FruitModel.insertMany([...fruitSampleData.map(FruitMapper.toPersistence)]);
	}
}
