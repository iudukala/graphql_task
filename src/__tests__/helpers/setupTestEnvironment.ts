import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { FruitMapper } from '../../Fruit/FruitMapper.js';
import { FruitRepo } from '../../Fruit/FruitRepository.js';
// import { DomainEventModel } from '../../infrastructure/persistence/DomainEventModel.js';
import { FruitModel } from '../../infrastructure/persistence/FruitModel.js';
import { connectDB } from '../../infrastructure/persistence/connectDB.js';
import { fruitSampleData } from '../data/sampleDataFruit.js';

// using a separate local database (without transaction capabilities since mongo instance is not part of replica set) for running tests
export const TEST_DB_URI_IDENTIFIER: 'DB_URI_LOCAL' | 'DB_URI' = 'DB_URI';

// no transaction capabilities on local non replica set member
const ATOMIC_TRANSACTION_FLAG = false;

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

	FruitRepo.ENABLE_TRANSACTIONS = ATOMIC_TRANSACTION_FLAG;

	// adding trivial event handler for the 'fruit modified' event
	// DomainEventManager.register(logEventSummary, FruitMutatedEvent.name);

	// starting up domain event manager cron job that checks for events in transactional outbox
	// DomainEventManager.init(TEST_DB_URI_IDENTIFIER);

	const collectionsFound = (await mongoose.connection.db.listCollections().toArray()).map(
		collection => collection.name,
	);

	try {
		// dropping collections
		if (collectionsFound.includes(FruitModel.collection.collectionName))
			await FruitModel.collection.drop();

		// if (collectionsFound.includes(DomainEventModel.collection.collectionName))
		// await DomainEventModel.collection.drop();
	} catch (exception) {
		console.error('test environment init failure when dropping collections: ' + exception);
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
