import { FruitDTO } from '../Fruit/types.js';
import { MUTATION_RETURN_TYPE_NAME } from '../graphql/nexus_types/MUTATION_RETURN_NAME.js';
import { NexusGenObjects } from '../infrastructure/nexus_autogen_artifacts/nexus_typegen.js';
import { perfromQuery } from './helpers/performQuery.js';

describe('deleteFruitFromFruitStorage() endpoint test', () => {
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
