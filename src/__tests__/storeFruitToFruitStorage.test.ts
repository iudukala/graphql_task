import { perfromQuery } from './performQuery.js';
import { initializeDBForTesting } from './initTestEnvironment.js';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

/**
 * replacing the import.meta access call for directory name since jest has effectively no esm support
 */
jest.mock('../graphql/dirnameESM.js', () => ({
	getDirname: () => __dirname,
}));

beforeAll(async () => {
	dotenv.config();
	await initializeDBForTesting(process.env['DB_URI']);
});

afterAll(async () => {
	mongoose.disconnect();
});

describe('storeFruitToFruitStorage() endpoint test', () => {
	test('finds an existing fruit', async () => {
		await perfromQuery(
			`query{
				findFruit(name: "lemon"){
					name
				}
			}`,
		).then(result => {
			expect(result.data).toBe(null);
		});

		const createMutName = 'createFruitForFruitStorage';
		perfromQuery(
			`mutation{
				${createMutName}(
					name: "lemon", description: "lemony description", limit: 20){
						name
						amount
						limit
				}
			}`,
		).then(result => {
			console.log(JSON.stringify(result));
			const returned = result.data?.[createMutName] as FruitTypeGQL;

			expect(returned.name).toBe('lemon');
			expect(returned.limit).toBe(20);
			expect(returned.amount).toBe(0);
		});
	});
});
