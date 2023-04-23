import { FruitDTO } from '../Fruit/types.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('createFruitForFruitStorage() endpoint negative test', () => {
	const MUTATION_NAME = 'createFruitForFruitStorage';

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

	test('attempt to create a valid fruit', async () => {
		await perfromQuery(
			`mutation{
				${MUTATION_NAME}(
					name: "lemon", description: "this is a lemon", limit: 10){
						name
				}
			}`,
		).then(result => {
			expect((result.data?.[MUTATION_NAME] as FruitDTO).name).toBe('lemon');
		});
	});

	test('attempt to create a duplicate fruit', async () => {
		await perfromQuery(
			`mutation{
				${MUTATION_NAME}(
					name: "lemon", description: "this is a lemon", limit: 10){
						name
				}
			}`,
		).then(result => {
			expect(result.data).toBe(null);
		});
	});
});
