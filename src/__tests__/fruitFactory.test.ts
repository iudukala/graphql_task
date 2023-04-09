import { graphql } from 'graphql';
import { Fruit } from '../Fruit/Fruit.js';
import { nexusSchema } from '../graphql/schemaConfigNexus.js';
import { contextGQL } from '../graphql/contextGQL.js';

/**
 * replacing the import.meta access call since jest has effectively no esm support
 */
jest.mock('../graphql/dirnameESM.js', () => ({
	getDirname: () => __dirname,
}));

test('creates a new Fruit and checks translatio', async () => {
	expect(Fruit.createNewFruit({ name: 'apple', limit: 50, description: 'desc' }).props.limit).toBe(
		50,
	);

	await graphql({
		schema: nexusSchema,
		source: `query{
			fruits{
				id
				name
				limit
			}
		}`,
		contextValue: contextGQL,
	}).then(data => {
		console.log(JSON.stringify(data));
	});
});

test('basic ', () => {
	type T = { a: number; b: number };
	const x: T = { a: 3, b: 3 };
	expect(x.a + x.b).toBe(6);
});
