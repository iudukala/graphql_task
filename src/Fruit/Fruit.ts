import { FruitKey } from '../graphql/constants/enum_fruitKey';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitType';
import { FruitDescriptionVO } from './FruitDescriptionVO';
import { Entity } from '../core/Entity';

type FruitInternalProps = Omit<FruitTypeGQL, typeof FruitKey.Description> & {
	[FruitKey.Description]: FruitDescriptionVO;
};

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
