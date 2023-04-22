import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { FruitMapper } from '../../Fruit/FruitMapper.js';
import { FruitRepo } from '../../Fruit/FruitRepository.js';
import { FruitModel } from '../../infrastructure/persistence/FruitModel.js';
import { connectDB } from '../../infrastructure/persistence/connectDB.js';
import { fruitSampleData } from '../data/sampleDataFruit.js';

/**
 * replacing the import.meta access call for directory name since jest has effectively no esm support
 */
jest.mock('../../graphql/dirnameESM.js', () => ({
	getDirectoryPath: () => __dirname,
}));

// jest.setTimeout(100000);

/**
 * jest setup hook that runs once per test file. clears out existing data and adds new data for testing
 */
beforeAll(async () => {
	dotenv.config();

	await connectDB(process.env['DB_URI']);
	FruitRepo.ATOMIC_TRANSACTION_FLAG = true;

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
});

/**
 * jest teardown hook. closes database connection
 */
afterAll(async () => {
	mongoose.connection.close();
});
