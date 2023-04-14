import { Fruit } from '../Fruit/Fruit.js';
import { FruitKey } from '../Fruit/enum_fruitKey.js';
import { PersistenceFruitModel } from './type_persistenceFruitModel.js';

/**
 * takes a response object returned from mongoose and returns a fruit domain entity
 *
 * @param fruit object returned through mongoose
 * @returns {Fruit} a new fruit domain entity
 */
export const mapFromPersistenceModel_obsolete = (fruit: PersistenceFruitModel): Fruit => {
	return Fruit.reconstituteFruit({
		id: fruit._id.toString(),
		[FruitKey.Name]: fruit.name,
		[FruitKey.Description]: fruit.description,
		[FruitKey.Limit]: fruit.limit,
		[FruitKey.Amount]: fruit.amount,
	});
};
