import { FruitKey } from '../graphql/constants/enum_fruitKey';
import { FruitType } from '../graphql/nexus_types/FruitType';
import { Entity } from './Entity';

type FruitInternal = Omit<FruitType, typeof FruitKey.Description> & {
	[FruitKey.Description]: DescriptionValueObject;
};

/** @template FruitType */
class Fruit extends Entity<FruitInternal> {
	/**
	 *
	 * @param {FruitType} propsFruitGQL fruit data object. probably
	 */
	constructor(propsFruitGQL: FruitType) {
		// const descOverridden = Object.assign({}, )
		const { description, ...noDescription } = propsFruitGQL;

		super(() => this.props.name, {
			[FruitKey.Description]: new DescriptionValueObject(propsFruitGQL.description ?? null),
			...propsFruitGQL,
		});
		const p = super.props;
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
