import { FruitKey } from '../graphql/constants/enum_fruitKey';
import { FruitType } from '../graphql/nexus_types/FruitType';
import { Entity } from './Entity';
import _ from 'lodash';

type ModifiedFruitType = Omit<FruitType, 'id'>;
class Fruit extends Entity<FruitType> {
	constructor(propsFruitGQL: FruitType) {
		// super(propsGQL.name, { ...propsGQL, [FruitKey.Name]: undefined });
		const { name, ...fruitProps } = _.cloneDeep(propsFruitGQL);
		super(propsGQL.name, fruitProps);
		// super(propsGQL.name, propsGQL);
		// _.cloneDeepWith(propsGQL, (_, key: string | number | undefined) => {
		//     if
		// }))
		// );
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
