import { FruitKey } from '../../../Fruit/enum_fruitKey.js';
import { FruitModel } from '../../../Fruit/mongooseFruitModel.js';
import { connectDB } from '../../../persistence/connectDB.js';

/**
 * helper function for the graphql resolvers to locate a fruit by it's name
 *
 * @param fruitName the fruit to query for
 * @param DB_URI database connection uri
 */
export const findFruitByName = async (fruitName: string, DB_URI: string) => {
	await connectDB(DB_URI);
	const target = await FruitModel.findOne({ [FruitKey.Name]: fruitName }).exec();

	if (target === null || target === undefined)
		throw new Error(`fruit not found for name: [${fruitName}]`);

	return target;
};
