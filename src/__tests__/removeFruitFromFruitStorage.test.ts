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

describe('removeFruitFromFruitStorage() endpoint test', () => {
	test('ensures fruit exists,  validates created data', async () => {
		jest.setTimeout(10000);

		await perfromQuery(
			`query{
				findFruit(name: "apple"){
					amount
				}
			}`,
		).then(result => {
			expect((result.data?.findFruit as [FruitDTO])[0].amount).toBe(0);
		});

		await perfromQuery(
			`mutation{
				storeFruitToFruitStorage(
					name: "apple", amount: 2){
						amount
				}
			}`,
		).then(result => {
			expect((result.data?.['storeFruitToFruitStorage'] as FruitDTO).amount).toBe(2);
		});

		await perfromQuery(
			`mutation{
				removeFruitFromFruitStorage(
					name: "apple", amount: 2){
						amount
				}
			}`,
		).then(result => {
			expect((result.data?.['removeFruitFromFruitStorage'] as FruitDTO).amount).toBe(0);
		});
	});
});
