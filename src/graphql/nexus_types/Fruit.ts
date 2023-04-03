import { objectType } from 'nexus';
import { GQLNexusTypeName } from '../enum_nexus_type_keys';

export const FruitNX = objectType({
	name: GQLNexusTypeName.Fruit,
	definition(t) {
		t.nonNull.string('id');
		t.nonNull.string('name');
		t.string('description');
		t.nonNull.int('amount');
	},
});
