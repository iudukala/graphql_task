import { FruitKey } from '../Fruit/enum_fruitKey.js';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';
import { Fruit } from '../Fruit/Fruit.js';
import mongoose, { Model, Schema } from 'mongoose';
import { FruitModel } from '../Fruit/mongooseFruitModel.js';

/**
 *
 *
 * @param {Fruit} fruit fruit object to be translated
 * @returns {FruitTypeGQL} transted mongoose fruit model object that can be commited to the database
 */
export function mapToPersistenceModel(fruit: Fruit) {
	return new FruitModel({
		_id: new mongoose.Types.ObjectId(fruit.id),
		[FruitKey.Name]: fruit.props.name,
		[FruitKey.Description]: fruit.props.description.value,
		[FruitKey.Limit]: fruit.props.limit,
		[FruitKey.Amount]: fruit.props.amount,
	});
}