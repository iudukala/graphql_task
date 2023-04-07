import { booleanArg } from 'nexus';
import { FruitKey } from '../graphql/constants/enum_fruitKey';
import { FruitType } from '../graphql/nexus_types/FruitType';
import { Entity } from './Entity';

// import { FruitKey } from '../graphql/constants/enum_fruitKey';
// import _ from 'lodash';

/** @template FruitType */
// class Fruit extends Entity<FruitType &  { 'description': DescriptionValueObject }> {
class Fruit extends Entity<FruitType> {
	/**
	 *
	 * @param {FruitType} propsFruitGQL fruit data object. probably
	 */
	constructor(propsFruitGQL: FruitType) {
		super(() => 'x', propsFruitGQL);

		interface X extends Omit<FruitType, 'description'> {
			description: DescriptionValueObject;
		}

		type Z = Omit<FruitType, 'description'> & { description: DescriptionValueObject };

		const one: Z = {
			description: new DescriptionValueObject('s'),
			id: 's',
			amount: 10,
			limit: 100,
			name: 'asdf'
		};

		// super(propsFruitGQL);
		// type X = {[Key in keyof {'description': any}]?{[Key]: DescriptionValueObject}: {[Key]: FruitType[Key]} }
		// type new  = {[Key in keyof {'description': any}]?{[Key]:DescriptionValueObject}:{[Key]:boolean}}

		// type X = {
		// 	[Key in keyof FruitType]: Key in keyof {'description':any}?string:boolean;
		// }

		// type MapDbObject<T> = {
		// [Property in keyof T]: T[Property] extends FruitType ? string : T[Property];
		// [Property in keyof FruitType]: Property === 'description' ? string : T[Property];
		// };

		// super(() => this.props.name, {
		// 	[FruitKey.Description]: new DescriptionValueObject(propsFruitGQL.description),
		// 	...propsFruitGQL,
		// });
		const p = super.props;
	}
}

abstract class ValueObject<T> {
	public readonly value: T;

	constructor(valueArg: T) {
		// making value immutable
		this.value = Object.freeze(valueArg);
	}
}
class DescriptionValueObject extends ValueObject<string> {
	constructor(nameArg: string) {
		super(nameArg);
	}
}
