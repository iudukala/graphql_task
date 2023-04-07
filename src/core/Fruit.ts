import { FruitKey } from '../graphql/constants/enum_fruitKey';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitType';
import { Entity } from './Entity';

type FruitInternalProps = Omit<FruitTypeGQL, typeof FruitKey.Description> & {
	[FruitKey.Description]: DescriptionValueObject;
};

/** @template FruitInternal*/
class Fruit extends Entity<FruitInternalProps> {
	/**
	 *
	 * @param {FruitInternalProps} propsFruit Fruit data
	 */
	private constructor(propsFruit: FruitInternalProps) {
		super(() => this.props.name, propsFruit);
	}

	static createFruit(fruitPropsGQL: FruitTypeGQL) {
		return new Fruit({
			[FruitKey.Description]: new DescriptionValueObject(fruitPropsGQL.description ?? null),
			[FruitKey.Name]: fruitPropsGQL.name,
			[FruitKey.Amount]: fruitPropsGQL.amount,
			[FruitKey.Limit]: fruitPropsGQL.limit,
			[FruitKey.ID]: fruitPropsGQL.id,
		});
	}
}

abstract class ValueObject<T> {
	public readonly value: T | null;

	constructor(valueArg: T | null) {
		// making value immutable
		this.value = Object.freeze(valueArg);
	}
}
class DescriptionValueObject extends ValueObject<string> {
	constructor(nameArg: string | null) {
		super(nameArg);
	}
}
