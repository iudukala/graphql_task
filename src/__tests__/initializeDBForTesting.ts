import { contextGQL } from '../graphql/common/contextGQL.js';
import dotenv from 'dotenv';
import { FruitModel } from '../Fruit/mongooseFruitModel.js';
import { tempDataFruit } from '../tempData.js';
import { commitToPersistence } from '../persistence/commitToPersistence.js';
import { connectDB } from '../persistence/connectDB.js';

/**
 * clears out data and adds
 */
export async function initializeDBForTesting() {
	dotenv.config();
	await connectDB(contextGQL.DB_URI);

	await FruitModel.collection.drop();
	await tempDataFruit.forEach(fruit => commitToPersistence(fruit, contextGQL.DB_URI));
}
