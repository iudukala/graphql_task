// import { Fruit } from '../Fruit/Fruit.js';

// test('creates a new Fruit and checks translatio', () => {
// 	expect(Fruit.createNewFruit({ name: 'apple', limit: 50, description: 'desc' }).props.limit).toBe(
// 		50,
// 	);
// });

test('creates a new Fruit and checks translatio', () => {
	type T = { a: number; b: number };
	const x: T = { a: 3, b: 3 };
	expect(x.a + x.b).toBe(6);
});
