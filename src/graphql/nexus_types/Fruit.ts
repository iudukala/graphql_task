import { objectType } from 'nexus';
import { GQLType } from '../constants/enum_nexus_type_keys';

export const FruitNX = objectType({
	name: GQLType.Fruit,
	definition(t) {
		t.nonNull.string('id');
		t.nonNull.string('name');
		t.string('description');
		t.nonNull.int('amount');
	},
});
