import { FruitType } from '../graphql/nexus_types/FruitType';
import { Entity } from './Entity';

// import { FruitKey } from '../graphql/constants/enum_fruitKey';
// import _ from 'lodash';

class Fruit extends Entity<FruitType> {
	constructor(propsFruitGQL: FruitType) {
		/**
		 * since the object is immutable, the fact that there are now two references to the field 'name' is not an issue
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
