import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { initializeDBForTesting } from './helpers/initTestEnvironment.js';
import { perfromQuery } from './helpers/performQuery.js';
import { MUTATION_RETURN_TYPE_NAME } from '../graphql/nexus_types/MUTATION_RETURN_NAME.js';
import { NexusGenObjects } from '../infrastructure/nexus_autogen_artifacts/nexus_typegen.js';

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

describe('deleteFruitFromFruitStorage() endpoint test', () => {
	test('deletes an existing fruit', async () => {
		// checking existence
		await perfromQuery(
			`query{
				findFruit(name: "apple"){
					name
				}
			}`,
		).then(result => {
			type ResponseType = { findFruit: [{ name: string }] };
			expect((result.data as ResponseType).findFruit[0].name).toBe('apple');
		});

		// deleting fruit
		const MUT_NAME = 'deleteFruitFromFruitStorage';
		await perfromQuery(
			`mutation{
				${MUT_NAME}(
					name: "apple", forceDelete: false){
						successful
					}
			}`,
		).then(result => {
			const returned = result.data?.[MUT_NAME] as NexusGenObjects[typeof MUTATION_RETURN_TYPE_NAME];
			expect(returned.successful).toBe(true);
		});

		//checking if fruit exists again, after deletion
		await perfromQuery(
			`query{
				findFruit(name: "apple"){
					name
				}
			}`,
		).then(result => {
			expect(result.data).toBe(null);
		});
	});
});

//todo: add another test where force delete is necessary
