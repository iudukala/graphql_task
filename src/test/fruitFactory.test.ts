import { Fruit } from '../Fruit/Fruit';

test('creates a new Fruit and checks translatio', () => {
	expect(Fruit.createNewFruit({ name: 'apple', limit: 50, description: 'desc' }).props.limit).toBe(
		50,
	);
});
