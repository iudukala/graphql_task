import mongoose from 'mongoose';
import { connectDB } from '../persistence/connectDB.js';
import { Fruit } from './Fruit.js';
import { FruitKey } from './enum_fruitKey.js';
import { FruitModel } from './mongooseFruitModel.js';
import { FruitMapper } from './FruitMapper.js';
export class FruitRepository {
	private readonly DB_URI: string;

	constructor(DB_URI: string) {
		this.DB_URI = DB_URI;
	}

	/**
	 * @description checks if a fruit with the same name exists. (fruit names are unique)
	 * @param fruitName fruitname to check
	 * @returns whether it exists
	 */
	exists = async (fruitName: string): Promise<boolean> => {
		return !!(await this.findFruitByName(fruitName));
	};

	/**
	 * @description locates a fruit by it's name
	 * @param fruitName the name to query for
	 */
	findFruitByName = async (fruitName: string) => {
		await connectDB(this.DB_URI);
		const target = await FruitModel.findOne({ [FruitKey.Name]: fruitName }).exec();

		if (target === null || target === undefined)
			throw new Error(`fruit not found for name: [${fruitName}]`);

		return target;
	};

	/**
	 * @description takes a fruit and commits it to the database. would make sense to convert this to a generic function but currently the only domain entity is fruit.
	 * @param fruit fruit object
	 * @returns  the committed object cast to a form that the nexus resolvers recognize
	 */
	commitToPersistence = async (fruit: Fruit): Promise<true> => {
		await connectDB(this.DB_URI);

		await FruitMapper.toPersistence(fruit)
			.save()
			.catch(error => {
				throw new Error('database commit failed: ' + error);
			});

		mongoose.connection.close();
		return true;
	};
}
