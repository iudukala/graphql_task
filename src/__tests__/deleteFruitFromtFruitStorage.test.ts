import { perfromQuery } from './helpers/performQuery.js';
import { initializeDBForTesting } from './helpers/initTestEnvironment.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { FruitDTO } from '../Fruit/types.js';
import { FruitMapper } from '../Fruit/FruitMapper.js';

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
	test.skip('ensures fruit exists, deletes and validated removal', async () => {
		jest.setTimeout(10000);

		await perfromQuery(
			`query{
				findFruit(name: "apple"){
					name
				}
			}`,
		).then(result => {
			expect(result.data).not.toBe(null);
		});

		const mutationName = 'deleteFruitFromFruitStorage';
		await perfromQuery(
			`mutation{
				${mutationName}(
					name: "apple", forceDelete: false)
			}`,
		).then(result => {
			// const returned = FruitMapper.toDomain(result.data?.[mutationName])
			// //  as FruitDTO;
			// expect(returned.name).toBe('lemon');
			// expect(returned.limit).toBe(20);
			// expect(returned.amount).toBe(0);
		});
	});
});
