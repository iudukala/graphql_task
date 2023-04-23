import { FruitDTO } from '../Fruit/types.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('createFruitForFruitStorage() endpoint test', () => {
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

	test('create a fruit and validate created data', async () => {
		const createMutName = 'createFruitForFruitStorage';
		await perfromQuery(
			`mutation{
				${createMutName}(
					name: "lemon", description: "this is a lemon", limit: 10){
						name
						amount
						limit
				}
			}`,
		).then(result => {
			const returned = result.data?.[createMutName] as FruitDTO;

			expect(returned.name).toBe('lemon');
			expect(returned.limit).toBe(10);
			expect(returned.amount).toBe(0);
		});
	});
});
