import mongoose from 'mongoose';
import { Fruit } from '../Fruit/Fruit.js';
import { FruitModelType, PersistenceFruitModel } from '../Fruit/types.js';
import { FruitKey } from './enum_fruitKey.js';
import { FruitModel } from './mongooseFruitModel.js';

export class FruitMapper {
	/**
	 * @description reconstitutes an existing fruit object, usually fetched through a persistance layer
	 * @param  fruitProps fruit object data
	 * @returns constructed fruit object
	 */
	static toDomain = (fruitProps: PersistenceFruitModel): Fruit => {
		return Fruit.reconstitute({
			[FruitKey.ID]: fruitProps._id.toString(),
			[FruitKey.Name]: fruitProps.name.trim(),
			[FruitKey.Description]: fruitProps.description?.trim(),
			[FruitKey.Limit]: fruitProps.limit,
			[FruitKey.Amount]: fruitProps.amount,
		});
	};

	/**
	 * @description translates a fruit object to a mongoose model instance/document
	 * @param fruit fruit object to be translated
	 * @returns translated mongoose fruit model object that can be commited to the database
	 */
	static toPersistence = (fruit: Fruit): FruitModelType => {
		return new FruitModel({
			_id: new mongoose.Types.ObjectId(fruit.id),
			[FruitKey.Name]: fruit.props.name,
			[FruitKey.Description]: fruit.props.description.value,
			[FruitKey.Limit]: fruit.props.limit,
			[FruitKey.Amount]: fruit.props.amount,
		});
	};
}
