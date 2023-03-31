import { v4 as uuid } from 'uuid';
import { FruitType } from './fruitType';

export const fruit: Array<FruitType> = [
	{
		id: uuid(),
		name: 'apple',
		description: 'apples the fruit',
		amount: 1,
	},
	{
		id: uuid(),
		name: 'orange',
		description: 'oranges the fruit',
		amount: 15,
	},
];
