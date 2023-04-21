import { DomainEvent } from '../core/DomainEvent.js';
import { Fruit } from './Fruit.js';

export class FruitCreatedEvent implements DomainEvent {
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
