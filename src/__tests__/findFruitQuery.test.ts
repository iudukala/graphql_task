import { FruitDTO } from '../Fruit/types.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('findFruit() query tests', () => {
	test('finds an existing fruit', async () => {
		const result = await perfromQuery(
			`query{
				findFruit(name: "apple"){
					name
				}
			}`,
		);

		expect((result.data?.findFruit as [FruitDTO])[0].name).toBe('apple');
	});

	test('searches for a non-existent fruit', async () => {
		const result = await perfromQuery(
			`query{
				findFruit(name: "lemon"){
					name
				}
			}`,
		);

		expect(result.data).toBe(null);
	});
});
