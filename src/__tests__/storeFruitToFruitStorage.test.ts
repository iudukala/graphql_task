import { FruitDTO } from '../Fruit/types.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('storeFruitToFruitStorage() endpoint test', () => {
	test('check existing fruit amount', async () => {
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
