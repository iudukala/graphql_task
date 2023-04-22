import { FruitDTO } from '../Fruit/types.js';
import { perfromQuery } from './helpers/performQuery.js';

/**
 * replacing the import.meta access call for directory name since jest has effectively no esm support
 */
// jest.mock('../graphql/dirnameESM.js', () => ({
// 	getDirname: () => __dirname,
// }));

// beforeEach(async () => {
// 	dotenv.config();
// 	await initializeDBForTesting(process.env['DB_URI']);
// });

// afterAll(async () => {
// 	mongoose.connection.close();
// });

describe('createFruitForFruitStorage() endpoint negative test', () => {
	test("attempts to create a duplicate fruit", async () => {
		jest.setTimeout(10000);

		await perfromQuery(
			`query{
				findFruit(name: "apple"){
					name
				}
			}`,
		).then(result => {
			expect((result.data?.findFruit as [FruitDTO])[0].name).toBe('apple');
		});

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
