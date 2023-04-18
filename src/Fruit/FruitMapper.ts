
import { Fruit } from '../Fruit/Fruit.js';
import { PersistenceFruitModel } from '../Fruit/types.js';

export interface Mapper<T> {
	toDomain(item: PersistenceFruitModel): Fruit;
    // toPersistence()
}