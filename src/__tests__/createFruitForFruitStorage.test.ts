import { perfromQuery } from './helpers/performQuery.js';
import { initializeDBForTesting } from './helpers/initTestEnvironment.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { FruitDTO } from '../Fruit/types.js';

/**
 * replacing the import.meta access call for directory name since jest has effectively no esm support
 */
jest.mock('../graphql/dirnameESM.js', () => ({
	getDirname: () => __dirname,
}));

beforeEach(async () => {
	dotenv.config();
	await initializeDBForTesting(process.env['DB_URI']);
});

afterAll(async () => {
	mongoose.connection.close();
});

describe('createFruitForFruitStorage() endpoint test', () => {
	test("creates a fruit and validates created data", async () => {
		jest.setTimeout(10000);

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