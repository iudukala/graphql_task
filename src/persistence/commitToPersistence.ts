import mongoose from 'mongoose';
import { Fruit } from '../Fruit/Fruit.js';
import { connectDB } from './connectDB.js';
import { mapToPersistenceModel } from './mapToPersistenceModel.js';
import { PersistenceFruitModel } from './type_persistenceFruitModel.js';

/**
 * takes a fruit and commits it to the database. would make sense to convert this to a generic function but currently the only domain entity is fruit.
 *
 * @param fruit fruit object
 * @param DB_URI database connection uri
 * @returns
 */
export async function commitToPersistence(
	fruit: Fruit,
	DB_URI: string,
): Promise<PersistenceFruitModel> {
	connectDB(DB_URI);

	const newFruit = await mapToPersistenceModel(fruit)
		.save()
		.catch(error => {
			throw new Error('database commit failed: ' + error);
		});

	mongoose.connection.close();
	return newFruit;
}
