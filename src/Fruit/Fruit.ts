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
	 * @param {FruitInternalProps} propsFruit Fruit data
	 */
	private constructor(propsFruit: FruitInternalProps) {
		super(() => this.props.name, propsFruit);
	}

	/**
	 *
	 * @param {FruitTypeGQL} fruitPropsGQL object containing data required for building
	 * @returns {Fruit} a new immutable Fruit object
	 */
	static createFruit(fruitPropsGQL: FruitConstructArgs) {
		return new Fruit(
			Object.freeze({
				[FruitKey.ID]: randomUUID(),
				[FruitKey.Name]: fruitPropsGQL.name,
				[FruitKey.Description]: new FruitDescriptionVO(fruitPropsGQL.description ?? null),
				[FruitKey.Limit]: fruitPropsGQL.limit,
				[FruitKey.Amount]: 0,
			}),
		);
	}
}
