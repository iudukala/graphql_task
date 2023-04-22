import { FruitDTO } from '../Fruit/types.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('removeFruitFromFruitStorage() endpoint test', () => {
	test('check existing fruit', async () => {
		await perfromQuery(
			`query{
				findFruit(name: "apple"){
					amount
				}
			}`,
		).then(result => {
			expect((result.data?.findFruit as [FruitDTO])[0].amount).toBe(0);
		});
	});

	test('increase stored amount', async () => {
		await perfromQuery(
			`mutation{
				storeFruitToFruitStorage(
					name: "apple", amount: 2){
						amount
				}
			}`,
		).then(result => {
			expect((result.data?.['storeFruitToFruitStorage'] as FruitDTO).amount).toBe(2);
		});
	});

	test('reduces a valid amount from an existing fruit', async () => {
		await perfromQuery(
			`mutation{
				removeFruitFromFruitStorage(
					name: "apple", amount: 2){
						amount
				}
			}`,
		).then(result => {
			expect((result.data?.['removeFruitFromFruitStorage'] as FruitDTO).amount).toBe(0);
		});
	});
});
