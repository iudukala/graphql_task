import { objectType } from 'nexus';
import { GQLType } from '../constants/enum_nexusTypeKey';

export const FruitNX = objectType({
	name: GQLType.Fruit,
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.string('name');
		t.string('description');

		t.nonNull.int('limit');
		t.nonNull.int('amount');
	},
});