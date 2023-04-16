import { objectType } from 'nexus';
import { FRUIT_NAME } from '../../globals/FRUIT_NAME.js';

export const FruitNX = objectType({
	name: FRUIT_NAME,
	definition(t) {
		t.nonNull.id('id');
		t.nonNull.string('name');
		t.string('description');

		t.nonNull.int('limit');
		t.nonNull.int('amount');
	},
});
