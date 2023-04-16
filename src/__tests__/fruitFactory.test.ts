import { graphql } from 'graphql';
import { nexusSchema } from '../graphql/schemaConfigNexus.js';
import { contextGQL } from '../graphql/common/contextGQL.js';
import { initializeDBForTesting } from './initTestEnvironment.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../persistence/connectDB.js';
import { FruitTypeGQL } from '../graphql/nexus_types/FruitTypeGQLNX.js';

/**
 * replacing the import.meta access call for directory name since jest has effectively no esm support
 */
jest.mock('../graphql/dirnameESM.js', () => ({
	getDirname: () => __dirname,
}));

beforeEach(async () => {
	dotenv.config();
	await initializeDBForTesting(process.env['DB_URI']);

	// await connectDB(process.env['DB_URI']);
});

afterAll(async () => {
	mongoose.disconnect();
});

const perfromQuery = (query: string) =>
	graphql({
		schema: nexusSchema,
		source: query,
		contextValue: contextGQL,
	});

describe('graphql tests', () => {
	test('uses query findFruit() to find an existing fruit', async () => {
		// jest.setTimeout(30000);

		const result = await perfromQuery(
			`query{
				findFruit(name: "apple"){
					name
					description
					id
				}
			}`,
		);

		// console.log('output----------------' + JSON.stringify(result));
		expect((result.data?.findFruit as [FruitTypeGQL])[0].name).toBe('apple');
	});
});
