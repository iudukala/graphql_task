import { FruitModel } from '../../infrastructure/persistence/FruitModel.js';
import { fruitSampleData } from '../data/sampleDataFruit.js';
import { connectDB } from '../../infrastructure/persistence/connectDB.js';
import mongoose from 'mongoose';
import { FruitMapper } from '../../Fruit/FruitMapper.js';
import dotenv from 'dotenv';

/**
 * clears out existing data and adds new
 *
 * @param DB_URI database connection uri
 */
// export async function initializeDBForTesting(DB_URI: string | null | undefined) {
// export const initializeDBForTesting = async () => {

/**
 * replacing the import.meta access call for directory name since jest has effectively no esm support
 */
jest.mock('../../graphql/dirnameESM.js', () => ({
	getDirectoryPath: () => __dirname,
}));

beforeAll(async () => {
	dotenv.config();
	await connectDB(process.env['DB_URI']);

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

afterAll(async () => {
	mongoose.connection.close();
});
