import { FruitKey } from '../graphql/constants/enum_fruitKey';
import { FruitType } from '../graphql/nexus_types/FruitType';
import { Entity } from './Entity';

class Fruit extends Entity<FruitType> {
	constructor(propsGQL: FruitType) {
		super(propsGQL.name, { ...propsGQL, [FruitKey.Name]: undefined });
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
