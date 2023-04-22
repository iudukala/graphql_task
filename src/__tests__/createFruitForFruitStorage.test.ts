import { FruitDTO } from '../Fruit/types.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('createFruitForFruitStorage() endpoint test', () => {
	test('check existence', async () => {
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

	test('creates a fruit and validates created data', async () => {
		const createMutName = 'createFruitForFruitStorage';
		await perfromQuery(
			`mutation{
				${createMutName}(
					name: "lemon", description: "lemony description", limit: 20){
						name
						amount
						limit
				}
			}`,
		).then(result => {
			const returned = result.data?.[createMutName] as FruitDTO;

			expect(returned.name).toBe('lemon');
			expect(returned.limit).toBe(20);
			expect(returned.amount).toBe(0);
		});
	});
});
