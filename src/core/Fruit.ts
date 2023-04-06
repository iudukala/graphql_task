import { FruitType } from '../graphql/nexus_types/FruitType';
import { Entity } from './Entity';

// import { FruitKey } from '../graphql/constants/enum_fruitKey';
// import _ from 'lodash';

class Fruit extends Entity<FruitType> {
	constructor(propsFruitGQL: FruitType) {
		/**
		 * since the object is immutable, the fact that the field 'name' is duplicated as "id" and the field 'name' inside the props object is a non issue. since fields aren't modified individually
		 */
		super(propsFruitGQL.name, propsFruitGQL);
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
