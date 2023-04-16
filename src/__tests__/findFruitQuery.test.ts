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

beforeEach(async () => {
	dotenv.config();
	await initializeDBForTesting(process.env['DB_URI']);
});

afterAll(async () => {
	mongoose.disconnect();
});

describe('graphql tests', () => {
	test('uses findFruit() to find an existing fruit', async () => {
		const result = await perfromQuery(
			`query{
				findFruit(name: "apple"){
					name
				}
			}`,
		);

		expect((result.data?.findFruit as [FruitTypeGQL])[0].name).toBe('apple');
	});

	test('uses findFruit() to find a non-existent fruit', async () => {
		const result = await perfromQuery(
			`query{
				findFruit(name: "XXXXXX"){
					name
				}
			}`,
		);

		expect(result.data).toBe(null);
	});
});
