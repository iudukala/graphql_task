import { objectType } from 'nexus';
import { MUTATION_RETURN_TYPE_NAME } from './MUTATION_RETURN_NAME.js';

export const MutationReturnType = objectType({
	name: MUTATION_RETURN_TYPE_NAME,
	definition(t) {
		t.nonNull.string('message');
		t.nonNull.boolean('successful');
	},
});
