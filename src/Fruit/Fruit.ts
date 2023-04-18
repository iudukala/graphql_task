import { FruitKey } from './enum_fruitKey.js';
import { FruitDescriptionVO } from './FruitDescriptionVO.js';
import { Entity } from '../core/Entity.js';
import mongoose from 'mongoose';
import type { FruitConstructArgs, FruitDTO, FruitInternalProps } from './types.js';

/** @template FruitInternal, FruitTypeGQL */
export class Fruit extends Entity<FruitInternalProps> {
	/**
	 *
	 * @param fruitData data to construct the object with
	 */
	private constructor(fruitData: FruitDTO) {
		super(fruitData[FruitKey.ID], {
			[FruitKey.Name]: fruitData.name.trim(),
			[FruitKey.Description]: FruitDescriptionVO.create(fruitData.description?.trim()),
			[FruitKey.Limit]: fruitData.limit,
			[FruitKey.Amount]: fruitData.amount,
		});
	}

	/**
	 * factory function to build new fruit objects. using the static reconstitute function to avoid duplicating construction logic
	 *
	 * @param {FruitConstructArgs} fruitProps data about new fruit object
	 * @returns {Fruit} a new immutable Fruit object
	 */
	static createNewFruit(fruitProps: FruitConstructArgs): Fruit {
		return new Fruit({
			[FruitKey.ID]: new mongoose.Types.ObjectId().toString(),
			[FruitKey.Amount]: 0,

			...fruitProps,
		});
	}

	// static reconstituteFruit(fruitProps: PersistenceFruitModel): Fruit {
	// 	return new Fruit(fruitProps._id.toString(), {
	// 		[FruitKey.Name]: fruitProps.name.trim(),
	// 		[FruitKey.Description]: FruitDescriptionVO.create(fruitProps.description?.trim()),
	// 		[FruitKey.Limit]: fruitProps.limit,
	// 		[FruitKey.Amount]: fruitProps.amount,
	// 	});
	// }

	/**
	 * reconstitutes an existing fruit object, usually fetched through a persistance layer
	 *
	 * @param fruitData fruit object data
	 * @returns constructed fruit object
	 */
	static reconstitute(fruitData: FruitDTO): Fruit {
		return new Fruit({
			[FruitKey.ID]: fruitData.id.toString(),
			[FruitKey.Name]: fruitData.name,
			[FruitKey.Description]: fruitData.description,
			[FruitKey.Limit]: fruitData.limit,
			[FruitKey.Amount]: fruitData.amount,
		});
	}
}
