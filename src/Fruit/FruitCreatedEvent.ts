import { IDomainEvent } from '../core/IDomainEvent.js';
import { Fruit } from './Fruit.js';

export class FruitCreatedEvent implements IDomainEvent {
	dateTimeOccured: Date;
	fruit: Fruit;

	constructor(fruit: Fruit) {
		this.dateTimeOccured = new Date();
		this.fruit = fruit;
	}

	getEntityID(): string {
		return this.fruit.id;
	}
}
