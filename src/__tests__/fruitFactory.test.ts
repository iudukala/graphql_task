import { graphql } from 'graphql';
import { Fruit } from '../Fruit/Fruit.js';
import { nexusSchema } from '../graphql/schemaConfigNexus.js';
import { contextGQL } from '../graphql/common/contextGQL.js';
import { initializeDBForTesting } from './initializeDBForTesting.js';
import mongoose from 'mongoose';

/**
 * replacing the import.meta access call for directory name since jest has effectively no esm support
 */
jest.mock('../graphql/dirnameESM.js', () => ({
	getDirname: () => __dirname,
}));

describe('graphql tests', () => {
	beforeEach(async () => {
		await initializeDBForTesting();
	});

	afterEach(async () => {
		mongoose.disconnect();
	});

	test('creates a new Fruit and checks translatio', async () => {
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
		// }).then(data => {
		// 	console.log('output----------------' + JSON.stringify(data));
		// 	expect(data).not.toBeNull();
		// });
	});
});
