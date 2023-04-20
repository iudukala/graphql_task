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

describe('createFruitForFruitStorage() endpoint negative test', () => {
	test("ensures fruit exists, then attempts to create to ensure that it's blocked", async () => {
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
