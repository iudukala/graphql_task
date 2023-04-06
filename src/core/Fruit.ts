import { FruitType } from '../graphql/nexus_types/FruitType';
import { Entity } from './Entity';

// import { FruitKey } from '../graphql/constants/enum_fruitKey';
// import _ from 'lodash';

/** @template FruitType */
class Fruit extends Entity<FruitType> {
	/**
	 *
	 * @param {FruitType} propsFruitGQL
	 */
	constructor(propsFruitGQL: FruitType) {
		super(() => this.props.name, propsFruitGQL);
	}
}

abstract class ValueObject<T> {
	public readonly value: T;

	constructor(valueArg: T) {
		// making value immutable
		this.value = Object.freeze(valueArg);
	}
}
class NameValueObject extends ValueObject<string> {
	constructor(nameArg: string) {
		super(nameArg);
	}
}
