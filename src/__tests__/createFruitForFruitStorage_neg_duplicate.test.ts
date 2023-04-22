import { FruitDTO } from '../Fruit/types.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('createFruitForFruitStorage() endpoint negative test', () => {
	test('ensure fruit existence', async () => {
		await perfromQuery(
			`query{
				findFruit(name: "apple"){
					name
				}
			}`,
		).then(result => {
			expect((result.data?.findFruit as [FruitDTO])[0].name).toBe('apple');
		});
	});

	test('attempt to create a duplicate fruit', async () => {
		const createMutName = 'createFruitForFruitStorage';
		await perfromQuery(
			`mutation{
				${createMutName}(
					name: "apple", description: "duplicate apple", limit: 20){
						name
				}
			}`,
		).then(result => {
			expect(result.data).toBe(null);
		});
	});
});
