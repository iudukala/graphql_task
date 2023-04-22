import { FruitDTO } from '../Fruit/types.js';
import { MUTATION_RETURN_TYPE_NAME } from '../graphql/nexus_types/MUTATION_RETURN_NAME.js';
import { NexusGenObjects } from '../infrastructure/nexus_autogen_artifacts/nexus_typegen.js';
import { perfromQuery } from './helpers/performQuery.js';

const DELETE_MUTATION = 'deleteFruitFromFruitStorage';

describe('deleteFruitFromFruitStorage(forceDelete: true) endpoint test', () => {
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

	test('increase stored amount', async () => {
		await perfromQuery(
			`mutation{
				storeFruitToFruitStorage(
					name: "apple", amount: 1){
						amount
				}
			}`,
		).then(result => {
			expect((result.data?.['storeFruitToFruitStorage'] as FruitDTO).amount).toBe(1);
		});
	});

	test('attempt to delete a fruit with amount > 0 without forceDelete', async () => {
		await perfromQuery(
			`mutation{
				${DELETE_MUTATION}(
					name: "apple", forceDelete: false){
						successful
					}
			}`,
		).then(result => {
			const returned = result.data?.[
				DELETE_MUTATION
			] as NexusGenObjects[typeof MUTATION_RETURN_TYPE_NAME];
			expect(returned.successful).toBe(false);
		});
	});

	test('checking if fruit exists after failed deletion', async () => {
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

	test('attempt to delete same fruit (with amount > 0) with forceDelete', async () => {
		await perfromQuery(
			`mutation{
				${DELETE_MUTATION}(
					name: "apple", forceDelete: true){
						successful
					}
			}`,
		).then(result => {
			const returned = result.data?.[
				DELETE_MUTATION
			] as NexusGenObjects[typeof MUTATION_RETURN_TYPE_NAME];
			expect(returned.successful).toBe(true);
		});
	});

	test("ensuring fruit doesn't exist after successful deletion", async () => {
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
