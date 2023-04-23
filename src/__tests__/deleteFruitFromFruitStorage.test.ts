import { FruitDTO } from '../Fruit/types.js';
import { MUTATION_RETURN_TYPE_NAME } from '../graphql/nexus_types/MUTATION_RETURN_NAME.js';
import { NexusGenObjects } from '../infrastructure/nexus_autogen_artifacts/nexus_typegen.js';
import { CREATE_LEMON_MUTATION } from './data/CREATE_LEMON_MUTATION_STR.js';
import { MUTATION_NAME } from './data/MUTATION_NAME.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('deleteFruitFromFruitStorage() endpoint test', () => {
	test('create valid fruit', async () => {
		await perfromQuery(CREATE_LEMON_MUTATION).then(result => {
			const returned = result.data?.[MUTATION_NAME.CREATE] as FruitDTO;

			expect(returned.name).toBe('lemon');
			expect(returned.limit).toBe(10);
			expect(returned.description).toBe('this is a lemon');
		});
	});

	test('increase stored amount', async () => {
		await perfromQuery(
			`mutation{
				storeFruitToFruitStorage(
					name: "lemon", amount: 5){
						amount
				}
			}`,
		).then(result => {
			expect((result.data?.['storeFruitToFruitStorage'] as FruitDTO).amount).toBe(5);
		});
	});

	test('check existence', async () => {
		await perfromQuery(
			`query{
				findFruit(name: "apple"){
					name
				}
			}`,
		).then(result => {
			expect((result.data?.['findFruit'] as [Partial<FruitDTO>])[0].name).toBe('apple');
		});
	});

	test('delete an existing fruit', async () => {
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
	});

	test("ensure fruit doesn't exist after deletion", async () => {
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
