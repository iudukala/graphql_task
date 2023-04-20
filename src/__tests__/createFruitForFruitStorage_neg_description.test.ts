import { perfromQuery } from './helpers/performQuery.js';
import { initializeDBForTesting } from './helpers/initTestEnvironment.js';
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
	mongoose.connection.close();
});

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
