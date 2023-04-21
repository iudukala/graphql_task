import { DomainEvent } from '../../core/DomainEvent.js';
import { Fruit } from '../Fruit.js';

/**
 * list of potential events that can be recognized by the event manager
 */
export const FRUIT_MUTATION_EVENT = {
	CREATED: 'CREATED',
} as const;

export class FruitMutatedEvent implements DomainEvent {
	dateTimeOccured: Date;
	fruitID: string;
	mutationType: keyof typeof FRUIT_MUTATION_EVENT;

	constructor(fruit: Fruit, mutationType: keyof typeof FRUIT_MUTATION_EVENT) {
		this.dateTimeOccured = new Date();
		this.fruitID = fruit.id;
		this.mutationType = mutationType;
	}

	getEntityID(): string {
		return this.fruitID;
	}
}
