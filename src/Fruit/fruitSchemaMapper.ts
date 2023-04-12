import { FruitKey } from './enum_fruitKey.js';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';
import { Fruit } from './Fruit.js';
import { Schema } from 'mongoose';
import { FruitModel } from './mongooseFruitModel.js';

/**
 *
 *
 * @param {Fruit} fruit fruit object to be translated
 * @returns {FruitTypeGQL} transted mongoose fruit model object that can be commited to the database
 */
export function fruitSchemaMapper(fruit: Fruit): FruitTypeGQL {
	return new FruitModel({
		[FruitKey.Name]: fruit.props.name,
		[FruitKey.Description]: fruit.props.description.value,
		[FruitKey.Limit]: fruit.props.limit,
		[FruitKey.Amount]: fruit.props.amount,
	});
}