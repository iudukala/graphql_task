import { FruitDTO } from '../Fruit/types.js';
import { CREATE_LEMON_MUTATION } from './data/CREATE_LEMON_MUTATION_STR.js';
import { MUTATION_NAME } from './data/MUTATION_NAME.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('findFruit() query tests', () => {
	test('create valid fruit', async () => {
		await perfromQuery(CREATE_LEMON_MUTATION).then(result => {
			const returned = result.data?.[MUTATION_NAME.CREATE] as FruitDTO;

			expect(returned.name).toBe('lemon');
			expect(returned.limit).toBe(10);
			expect(returned.description).toBe('this is a lemon');
		});
	});

	test('search for a non-existent fruit', async () => {
		const result = await perfromQuery(
			`query{
				findFruit(name: "not a lemon"){
					name
				}
			}`,
		);

		expect(result.data).toBe(null);
	});
});
