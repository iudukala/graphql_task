import { FruitModel } from '../Fruit/mongooseFruitModel.js';
import { tempDataFruit } from '../tempData.js';
import { connectDB } from '../persistence/connectDB.js';
import { mapToPersistenceModel } from '../persistence/mapToPersistenceModel.js';

/**
 * clears out existing data and adds new
 *
 * @param DB_URI database connection uri
 */
export async function initializeDBForTesting(DB_URI: string | null | undefined) {
	await connectDB(DB_URI);

	try {
		await FruitModel.collection.drop();
		console.log('dropped collection');
	} finally {
		await FruitModel.insertMany([...tempDataFruit.map(mapToPersistenceModel)]);
		console.log('added to collection');
	}
}
