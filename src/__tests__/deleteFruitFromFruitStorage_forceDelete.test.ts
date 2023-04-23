import { FruitDTO } from '../Fruit/types.js';
import { MUTATION_RETURN_TYPE_NAME } from '../graphql/nexus_types/MUTATION_RETURN_NAME.js';
import { NexusGenObjects } from '../infrastructure/nexus_autogen_artifacts/nexus_typegen.js';
import { CREATE_LEMON_MUTATION } from './data/CREATE_LEMON_MUTATION_STR.js';
import { MUTATION_NAME } from './data/MUTATION_NAME.js';
import { perfromQuery } from './helpers/performQuery.js';

const DELETE_MUTATION = 'deleteFruitFromFruitStorage';

describe('deleteFruitFromFruitStorage(forceDelete: true) endpoint test', () => {
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

	test('attempt to delete a fruit with amount > 0 without forceDelete', async () => {
		await perfromQuery(
			`mutation{
				${MUTATION_NAME.DELETE}(
					name: "lemon", forceDelete: false){
						successful
					}
			}`,
		).then(result => {
			const returned = result.data?.[
				MUTATION_NAME.DELETE
			] as NexusGenObjects[typeof MUTATION_RETURN_TYPE_NAME];
			expect(returned.successful).toBe(false);
		});
	});

	test('checking if fruit exists after failed deletion', async () => {
		await perfromQuery(
			`query{
				findFruit(name: "lemon"){
					name
				}
			}`,
		).then(result => {
			expect((result.data?.['findFruit'] as [Partial<FruitDTO>])[0].name).toBe('lemon');
		});
	});

	test('attempt to delete same fruit (with amount > 0) with forceDelete', async () => {
		await perfromQuery(
			`mutation{
				${MUTATION_NAME.DELETE}(
					name: "lemon", forceDelete: true){
						successful
					}
			}`,
		).then(result => {
			const returned = result.data?.[
				MUTATION_NAME.DELETE
			] as NexusGenObjects[typeof MUTATION_RETURN_TYPE_NAME];
			expect(returned.successful).toBe(true);
		});
	});

	test("ensuring fruit doesn't exist after successful deletion", async () => {
		await perfromQuery(
			`query{
				findFruit(name: "lemon"){
					name
				}
			}`,
		).then(result => {
			expect(result.data).toBe(null);
		});
	});
});
