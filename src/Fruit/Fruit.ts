import { FruitKey } from './enum_fruitKey.js';
import { FruitDescriptionVO } from './FruitDescriptionVO.js';
import { Entity } from '../core/Entity.js';
import { randomUUID } from 'crypto';

import type { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';
import type { FruitConstructArgs, FruitInternalProps } from './types.js';
import mongoose from 'mongoose';

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
	static createNewFruit(fruitProps: FruitConstructArgs, id?: string): Fruit {
		return Fruit.reconstituteFruit({
			[FruitKey.ID]: new mongoose.Types.ObjectId().toString(),
			[FruitKey.Amount]: 0,

			...fruitProps,
		});
	}

	/**
	 * reconstitutes an existing fruit object, usually fetched through a persistance layer
	 *
	 * @param {FruitTypeGQL} fruitProps fruit object data
	 * @returns
	 */

	static reconstituteFruit(fruitProps: FruitTypeGQL): Fruit {
		return new Fruit(fruitProps.id, {
			[FruitKey.Name]: fruitProps.name,
			[FruitKey.Description]: FruitDescriptionVO.create(fruitProps.description),
			[FruitKey.Limit]: fruitProps.limit,
			[FruitKey.Amount]: fruitProps.amount,
		});
	}
}
