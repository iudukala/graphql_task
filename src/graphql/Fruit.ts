import { objectType } from 'nexus';

export const Fruit = objectType({
	name: 'Fruit',
	definition(t) {
		t.string('id');
		t.string('name');
		t.string('description');
		t.int('amount');
	},
});
