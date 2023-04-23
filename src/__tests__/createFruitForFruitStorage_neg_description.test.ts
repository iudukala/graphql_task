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

	test('attempt to create a fruit with an invalid description', async () => {
		await perfromQuery(
			`mutation{
				createFruitForFruitStorage(
					name: "lemon", description: "this is a fruit with a very long\
					description", limit: 20){
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
