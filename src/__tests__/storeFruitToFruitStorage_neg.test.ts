import { FruitDTO } from '../Fruit/types.js';
import { CREATE_LEMON_MUTATION } from './data/CREATE_LEMON_MUTATION_STR.js';
import { MUTATION_NAME } from './data/MUTATION_NAME.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('storeFruitToFruitStorage() endpoint negative test', () => {
	test('create valid fruit', async () => {
		await perfromQuery(CREATE_LEMON_MUTATION).then(result => {
			const returned = result.data?.[MUTATION_NAME.CREATE] as FruitDTO;

			expect(returned.name).toBe('lemon');
			expect(returned.limit).toBe(10);
			expect(returned.amount).toBe(0);
		});
	});

	test('increment amount beyond limit', async () => {
		await perfromQuery(
			`mutation{
				${MUTATION_NAME.STORE}(
					name: "lemon", amount: 11){
						amount
				}
			}`,
		).then(result => {
			expect(result.data).toBe(null);
		});
	});

	test('ensure fruit amount is unmodified', async () => {
		await perfromQuery(
			`query{
				findFruit(name: "lemon"){
					amount
				}
			}`,
		).then(result => {
			expect((result.data?.findFruit as [FruitDTO])[0].amount).toBe(0);
		});
	});
});
