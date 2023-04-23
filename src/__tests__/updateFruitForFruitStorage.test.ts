import { FruitDTO } from '../Fruit/types.js';
import { CREATE_LEMON_MUTATION } from './data/CREATE_LEMON_MUTATION_STR.js';
import { MUTATION_NAME } from './data/MUTATION_NAME.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('storeFruitToFruitStorage() endpoint test', () => {
	test("ensure fruit doesn't exist", async () => {
		await perfromQuery(
			`query{
				findFruit(name: "lemon"){
					name
				}
			}`,
		).then(result => {
			expect(result.data).toBe(null);
		});
	});

	test('create valid fruit', async () => {
		await perfromQuery(CREATE_LEMON_MUTATION).then(result => {
			const returned = result.data?.[MUTATION_NAME.CREATE] as FruitDTO;

			expect(returned.name).toBe('lemon');
			expect(returned.limit).toBe(10);
			expect(returned.amount).toBe(0);
		});
	});

	test('update to a valid description', async () => {
		const UPDATE_MUT_NAME = 'updateFruitForFruitStorage';
		await perfromQuery(
			`mutation{
				${UPDATE_MUT_NAME}(
					name: "lemon", description: "updated lemon description"){
						name
						description
				}
			}`,
		).then(result => {
			expect((result.data?.[UPDATE_MUT_NAME] as FruitDTO).description).toBe(
				'updated lemon description',
			);
		});
	});
});
