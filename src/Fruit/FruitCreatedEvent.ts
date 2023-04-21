import { DomainEvent } from '../core/DomainEvent.js';
import { Fruit } from './Fruit.js';

export class FruitCreatedEvent implements DomainEvent {
	dateTimeOccured: Date;
	fruitID: string;

	constructor(fruit: Fruit) {
		this.dateTimeOccured = new Date();
		this.fruitID = fruit.id;
	}

	getEntityID(): string {
		return this.fruitID;
	}
}
