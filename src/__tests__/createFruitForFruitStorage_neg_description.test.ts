import { perfromQuery } from './helpers/performQuery.js';

describe('createFruitForFruitStorage() endpoint test', () => {
	test('attempts to create a fruit with an invalid description', async () => {
		await perfromQuery(
			`query{
				findFruit(name: "lemon"){
					name
				}
			}`,
		).then(result => {
			expect(result.data).toBe(null);
		});

		await perfromQuery(
			`mutation{
				createFruitForFruitStorage(
					name: "lemon", description: "lemony description that exceeds the \
					thirty character limit for descriptions", limit: 20){
						name
						amount
						limit
				}
			}`,
		).then(result => {
			expect(result.data).toBe(null);
		});
	});
});
