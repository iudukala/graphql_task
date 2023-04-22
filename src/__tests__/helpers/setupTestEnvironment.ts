import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { FruitMapper } from '../../Fruit/FruitMapper.js';
import { FruitRepo } from '../../Fruit/FruitRepository.js';
import { FruitModel } from '../../infrastructure/persistence/FruitModel.js';
import { connectDB } from '../../infrastructure/persistence/connectDB.js';
import { fruitSampleData } from '../data/sampleDataFruit.js';

// using a separate local database (without transaction capabilities since mongo instance is not part of replica set) for running tests
export const TEST_DB_URI_IDENTIFIER: 'DB_URI_LOCAL' | 'DB_URI' = 'DB_URI';
const ATOMIC_TRANSACTION_FLAG = true;

/**
 * replacing the import.meta access call for directory name since jest has effectively no esm support
 */
jest.mock('../../graphql/dirnameESM.js', () => ({
	getDirectoryPath: () => __dirname,
}));

/**
 * jest setup hook that runs once per test file. clears out existing data and adds new data for testing
 */
beforeAll(async () => {
	dotenv.config();
	await connectDB(process.env[TEST_DB_URI_IDENTIFIER]);

	FruitRepo.ATOMIC_TRANSACTION_FLAG = ATOMIC_TRANSACTION_FLAG;

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
