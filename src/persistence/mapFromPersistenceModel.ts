import mongoose from 'mongoose';
import { Fruit } from '../Fruit/Fruit.js';
import { FruitKey } from '../Fruit/enum_fruitKey.js';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';

type PersistenceFruit = Omit<FruitTypeGQL, typeof FruitKey.ID> & { _id: mongoose.Types.ObjectId };
/**
 * takes a response object returned from mongoose and returns a fruit domain entity
 *
 * @param fruit object returned through mongoose
 * @returns a new fruit domain entity
 */
export const mapFromPersistenceModel = (fruit: PersistenceFruit): Fruit => {
	return Fruit.reconstituteFruit({
		id: fruit._id.toString(),
		[FruitKey.Name]: fruit.name,
		[FruitKey.Description]: fruit.description,
		[FruitKey.Limit]: fruit.limit,
		[FruitKey.Amount]: fruit.amount,
	});
};
