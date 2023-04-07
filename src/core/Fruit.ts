import { FruitKey } from '../graphql/constants/enum_fruitKey';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitType';
import { Entity } from './Entity';

type FruitInternal = Omit<FruitTypeGQL, typeof FruitKey.Description> & {
	[FruitKey.Description]: DescriptionValueObject;
};

/** @template FruitType */
class Fruit extends Entity<FruitInternal> {
	/**
	 *
	 * @param {FruitTypeGQL} propsFruitGQL fruit data object. probably
	 */
	private constructor(propsFruitGQL: FruitTypeGQL) {
		// const descOverridden = Object.assign({}, )
		const { description, ...noDescription } = propsFruitGQL;
		const newO: FruitInternal = {
			amount,
		};

		super(() => this.props.name, {
			[FruitKey.Description]: new DescriptionValueObject(propsFruitGQL.description ?? null),
			...propsFruitGQL,
		});
		const p = super.props;
	}

	static createFruit(fruitPropsGQL: FruitTypeGQL) {

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
