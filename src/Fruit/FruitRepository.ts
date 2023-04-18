import { connectDB } from '../persistence/connectDB.js';
import { Fruit } from './Fruit.js';
import { FruitKey } from './enum_fruitKey.js';
import { FruitModel } from './mongooseFruitModel.js';

class FruitRepository {
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
}
