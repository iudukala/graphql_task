import { Fruit } from '../../Fruit/Fruit.js';
import { FruitConstructArgs } from '../../Fruit/types.js';

const constructArgs: Array<FruitConstructArgs> = [
	{
		name: 'apple',
		description: 'apple, the fruit',
		limit: 10,
	},
	{
		name: 'orange',
		description: 'orange, the fruit',
		limit: 10,
	},
	{
		name: 'pineapple',
		description: 'pineapple, the fruit',
		limit: 10,
	},
	{
		name: 'watermelon',
		description: 'watermelon, the fruit',
		limit: 10,
	},
	{
		name: 'peach',
		description: 'peach, the fruit',
		limit: 10,
	},
];

export const fruitSampleData: Array<Fruit> = constructArgs.map(Fruit.createNewFruit);
