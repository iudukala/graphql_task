import { FruitKey } from '../graphql/constants/enum_fruitKey';
import { FruitDescriptionVO } from './FruitDescriptionVO';
import { Entity } from '../core/Entity';

import type { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX';
import type { FruitInternalProps } from './types';


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
	 * @param {FruitTypeGQL} fruitPropsGQL object containing the necessary data
	 * @returns {Fruit} a new immutable Fruit object
	 */
	static createFruit(fruitPropsGQL: FruitTypeGQL) {
		return new Fruit(
			Object.freeze({
				[FruitKey.Description]: new FruitDescriptionVO(fruitPropsGQL.description ?? null),
				[FruitKey.Name]: fruitPropsGQL.name,
				[FruitKey.Amount]: fruitPropsGQL.amount,
				[FruitKey.Limit]: fruitPropsGQL.limit,
				[FruitKey.ID]: fruitPropsGQL.id,
			}),
		);
	}
}
