import { graphql } from 'graphql';
import { Fruit } from '../Fruit/Fruit.js';
import { nexusSchema } from '../graphql/schemaConfigNexus.js';
import { contextGQL } from '../graphql/contextGQL.js';

test('creates a new Fruit and checks translatio', () => {
	expect(Fruit.createNewFruit({ name: 'apple', limit: 50, description: 'desc' }).props.limit).toBe(
		50,
	);

	graphql({
		schema: nexusSchema,
		source: `query{
			fruits{
				id
				name
				limit
			}
		}`,
		contextValue: contextGQL,
	});
});

test('creates a new Fruit and checks translatio', () => {
	type T = { a: number; b: number };
	const x: T = { a: 3, b: 3 };
	expect(x.a + x.b).toBe(6);
});
