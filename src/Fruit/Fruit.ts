import { FruitKey } from '../graphql/constants/enum_fruitKey';
import { FruitDescriptionVO } from './FruitDescriptionVO';
import { Entity } from '../core/Entity';

import type { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX';
import type { FruitConstructArgs, FruitInternalProps } from './types';
import { isCryptoKey } from 'util/types';
import { randomUUID } from 'crypto';

/** @template FruitInternal, FruitTypeGQL */
class Fruit extends Entity<FruitInternalProps> {
	/**
	 *
	 * @param {string} identifier unique id
	 * @param {FruitInternalProps} propsFruit Fruit data
	 */
	private constructor(identifier: string, propsFruit: FruitInternalProps) {
		// const { [FruitKey.ID]: _discard, ...withoutID } = propsFruit;
		super(identifier, propsFruit);
	}

	/**
	 *
	 * @param {FruitTypeGQL} fruitProps object containing data required for building
	 * @returns {Fruit} a new immutable Fruit object
	 */
	static createNewFruit(fruitProps: FruitConstructArgs): Fruit {
		return new Fruit(
			randomUUID(),
			Object.freeze({
				[FruitKey.Name]: fruitProps.name,
				[FruitKey.Description]: new FruitDescriptionVO(fruitProps.description ?? null),
				[FruitKey.Limit]: fruitProps.limit,
				[FruitKey.Amount]: 0,
			}),
		);
	}

	static reconstituteFruit(fruitPropsGQL: FruitTypeGQLgit s): Fruit {
		return new Fruit(
			randomUUID(),
			Object.freeze({
				[FruitKey.Name]: fruitProps.name,
				[FruitKey.Description]: new FruitDescriptionVO(fruitProps.description ?? null),
				[FruitKey.Limit]: fruitProps.limit,
				[FruitKey.Amount]: 0,
			}),
		);

	}
}
