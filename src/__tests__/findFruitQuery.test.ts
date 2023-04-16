import { perfromQuery } from './helpers/performQuery.js';
import { initializeDBForTesting } from './helpers/initTestEnvironment.js';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

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

describe('findFruit() query tests', () => {
	test('finds an existing fruit', async () => {
		const result = await perfromQuery(
			`query{
				findFruit(name: "apple"){
					name
				}
			}`,
		);

		expect((result.data?.findFruit as [FruitTypeGQL])[0].name).toBe('apple');
	});

	test('finds a non-existent fruit', async () => {
		const result = await perfromQuery(
			`query{
				findFruit(name: "lemon"){
					name
				}
			}`,
		);

		expect(result.data).toBe(null);
	});
});
