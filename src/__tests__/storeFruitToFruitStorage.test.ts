import { FruitDTO } from '../Fruit/types.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('storeFruitToFruitStorage() endpoint test', () => {
	test('check existing fruit amount and limit', async () => {
		await perfromQuery(
			`query{
				findFruit(name: "apple"){
					amount
					limit
				}
			}`,
		).then(result => {
			const { amount, limit } = (result.data?.findFruit as [FruitDTO])[0];
			expect(amount).toBe(0);
			expect(limit).toBe(10);
		});
	});

	test('increment the amount by a valid count', async () => {
		const MUT_NAME = 'storeFruitToFruitStorage';
		await perfromQuery(
			`mutation{
				${MUT_NAME}(
					name: "apple", amount: 1){
						amount
				}
			}`,
		).then(result => {
			expect((result.data?.[MUT_NAME] as FruitDTO).amount).toBe(1);
		});
	});
});
