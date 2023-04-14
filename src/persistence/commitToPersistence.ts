import mongoose from 'mongoose';
import { Fruit } from '../Fruit/Fruit.js';
import { connectDB } from './connectDB.js';
import { mapToPersistenceModel } from './mapToPersistenceModel.js';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';

/**
 * takes a fruit and commits it to the database. would make sense to convert this to a generic function but currently the only domain entity is fruit.
 *
 * @param {Fruit} fruit fruit object
 * @param {string} DB_URI database connection uri
 * @returns {Promise<FruitTypeGQL>} the committed object cast to a form that the nexus resolvers recognize
 */
export async function commitToPersistence(fruit: Fruit, DB_URI: string): Promise<FruitTypeGQL> {
	connectDB(DB_URI);

	const newFruit = await mapToPersistenceModel(fruit)
		.save()
		.catch(error => {
			throw new Error('database commit failed: ' + error);
		});

	mongoose.connection.close();
	return newFruit as FruitTypeGQL;
}
