import { FruitKey } from './enum_fruitKey.js';
import { FruitDescriptionVO } from './FruitDescriptionVO.js';
import { Entity } from '../core/Entity.js';

import type { FruitTypeGQL } from '../graphql/nexus_types/type_FruitGQL.js';
import type { FruitConstructArgs, FruitInternalProps } from './types.js';
import mongoose from 'mongoose';

type PersistenceFruitModel = Omit<FruitTypeGQL, typeof FruitKey.ID> & {
	_id: mongoose.Types.ObjectId;
};
/** @template FruitInternal, FruitTypeGQL */
export class Fruit extends Entity<FruitInternalProps> {
	/**
	 *
	 * @param {string} identifier unique id
	 * @param {FruitInternalProps} propsFruit Fruit data
	 */
	private constructor(identifier: string, propsFruit: FruitInternalProps) {
		super(identifier, propsFruit);
	}

	/**
	 * factory function to build new fruit objects. using the static reconstitute function to avoid duplicating construction logic
	 *
	 * @param {FruitConstructArgs} fruitProps data about new fruit object
	 * @returns {Fruit} a new immutable Fruit object
	 */
	static createNewFruit(fruitProps: FruitConstructArgs): Fruit {
		return Fruit.reconstituteFruit({
			_id: new mongoose.Types.ObjectId(),
			[FruitKey.Amount]: 0,

			...fruitProps,
		});
	}

	/**
	 * reconstitutes an existing fruit object, usually fetched through a persistance layer
	 *
	 * @param {FruitTypeGQL} fruitProps fruit object data
	 * @returns constructed fruit object
	 */
	static reconstituteFruit(fruitProps: PersistenceFruitModel): Fruit {
		return new Fruit(fruitProps._id.toString(), {
			[FruitKey.Name]: fruitProps.name.trim(),
			[FruitKey.Description]: FruitDescriptionVO.create(fruitProps.description?.trim()),
			[FruitKey.Limit]: fruitProps.limit,
			[FruitKey.Amount]: fruitProps.amount,
		});
	}
}
