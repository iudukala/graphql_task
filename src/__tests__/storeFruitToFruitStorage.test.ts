import { perfromQuery } from './helpers/performQuery.js';
import { initializeDBForTesting } from './helpers/setupTestEnvironment.js';
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

describe('storeFruitToFruitStorage() endpoint test', () => {
	test("increments the fruit's amount by a valid count", async () => {
		await perfromQuery(
			`query{
				findFruit(name: "apple"){
					amount
				}
			}`,
		).then(result => {
			expect((result.data?.findFruit as [FruitDTO])[0].amount).toBe(0);
		});

		const MUT_NAME = 'storeFruitToFruitStorage';
		await perfromQuery(
			`mutation{
				${MUT_NAME}(
					name: "apple", amount: 1){
						amount
				}
			}`,
		).then(result => {
			expect((result.data?.[MUT_NAME] as FruitDTO).amount).toBe(1);
		});
	});
});
