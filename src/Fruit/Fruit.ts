import mongoose from 'mongoose';
import { AggregateRoot } from '../core/AggregateRoot.js';
import { FruitDescriptionVO } from './FruitDescriptionVO.js';
import { FruitKey } from './enum_fruitKey.js';
import { FruitConstructArgs, FruitDTO, FruitInternalProps } from './types.js';

export class Fruit extends AggregateRoot<FruitInternalProps> {
	/**
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
	 * @description factory function to build new fruit objects. using the static reconstitute function to avoid duplicating construction logic
	 * @param fruitProps data about new fruit object
	 * @returns a new immutable Fruit object
	 */
	static createNewFruit(fruitProps: FruitConstructArgs): Fruit {
		return new Fruit({
			[FruitKey.ID]: new mongoose.Types.ObjectId().toString(),
			[FruitKey.Amount]: 0,

			...fruitProps,
		});
	}

	/**
	 * @description reconstitutes an existing fruit object, usually fetched through a persistance layer
	 * @param fruitData fruit object data
	 * @returns constructed fruit object
	 */
	static reconstitute(fruitData: FruitDTO): Fruit {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { [FruitKey.ID]: _discard, ...noID } = fruitData;

		return new Fruit({
			[FruitKey.ID]: fruitData.id.toString(),
			...noID,
		});
	}
}
