import { FruitDTO } from '../Fruit/types.js';
import { CREATE_LEMON_MUTATION } from './data/CREATE_LEMON_MUTATION_STR.js';
import { MUTATION_NAME } from './data/MUTATION_NAME.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('removeFruitFromFruitStorage() endpoint test', () => {
	test('create valid fruit', async () => {
		await perfromQuery(CREATE_LEMON_MUTATION).then(result => {
			const returned = result.data?.[MUTATION_NAME.CREATE] as FruitDTO;

			expect(returned.name).toBe('lemon');
			expect(returned.limit).toBe(10);
			expect(returned.amount).toBe(0);
		});
	});

	test('increase stored amount', async () => {
		await perfromQuery(
			`mutation{
				storeFruitToFruitStorage(
					name: "lemon", amount: 5){
						amount
				}
			}`,
		).then(result => {
			expect((result.data?.['storeFruitToFruitStorage'] as FruitDTO).amount).toBe(5);
		});
	});

	test('reduce a valid amount from an existing fruit', async () => {
		await perfromQuery(
			`mutation{
				removeFruitFromFruitStorage(
					name: "lemon", amount: 5){
						amount
				}
			}`,
		).then(result => {
			expect((result.data?.['removeFruitFromFruitStorage'] as FruitDTO).amount).toBe(0);
		});
	});
});
