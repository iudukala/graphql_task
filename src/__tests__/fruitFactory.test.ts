import { graphql } from 'graphql';
import { nexusSchema } from '../graphql/schemaConfigNexus.js';
import { contextGQL } from '../graphql/common/contextGQL.js';
import { initializeDBForTesting } from './initializeDBForTesting.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../persistence/connectDB.js';

/**
 * replacing the import.meta access call for directory name since jest has effectively no esm support
 */
jest.mock('../graphql/dirnameESM.js', () => ({
	getDirname: () => __dirname,
}));

describe('graphql tests', () => {
	beforeAll(async () => {
		dotenv.config();
		await initializeDBForTesting(process.env['DB_URI']);
	});

	afterAll(async () => {
		mongoose.disconnect();
	});

	test('creates a new Fruit and checks translatio', async () => {
		await connectDB(process.env['DB_URI']);
		jest.setTimeout(30000);

		const result = await graphql({
			schema: nexusSchema,
			source: `query{
					findFruit(name: "apple"){
						name
						description
						id
					}
				}`,
			contextValue: contextGQL,
		});

		console.log('output----------------' + JSON.stringify(result));
		expect(result).not.toBeNull();
	});
});
