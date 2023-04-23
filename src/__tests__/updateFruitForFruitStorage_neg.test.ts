import { FruitDTO } from '../Fruit/types.js';
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
		const CREATE_MUT_NAME = 'createFruitForFruitStorage';
		await perfromQuery(
			`mutation{
				${CREATE_MUT_NAME}(
					name: "lemon", description: "this is a lemon", limit: 10){
						name
						limit
						description
				}
			}`,
		).then(result => {
			const returned = result.data?.[CREATE_MUT_NAME] as FruitDTO;

			expect(returned.name).toBe('lemon');
			expect(returned.limit).toBe(10);
			expect(returned.description).toBe('this is a lemon');
		});
	});

	test('update to a valid description', async () => {
		const UPDATE_MUT_NAME = 'updateFruitForFruitStorage';
		await perfromQuery(
			`mutation{
				${UPDATE_MUT_NAME}(
					name: "lemon", description: "updated lemon with a long description"){
						name
						description
				}
			}`,
		).then(result => {
			expect(result.data).toBe(null);
		});
	});
});
