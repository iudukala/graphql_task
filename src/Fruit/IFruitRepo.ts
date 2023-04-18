import { Repository } from '../core/Repository.js';
import { Fruit } from './Fruit.js';

export interface IFruitRepo extends Repository<Fruit> {
	getFruitByID(fruitID: string): Promise<Fruit>;
	getAllFruit(): Promise<Array<Fruit>>;
}
