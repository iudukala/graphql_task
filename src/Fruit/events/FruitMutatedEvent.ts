import { DomainEvent } from '../../core/DomainEvent.js';
import { Fruit } from '../Fruit.js';

/**
 * list of potential events that can be recognized by the event manager
 */
export const FRUIT_MUTATION_EVENT = {
	CREATED: 'CREATED',
	UPDATED: 'UPDATED',
	DELETED: 'DELETED',
} as const;

export class FruitMutatedEvent implements DomainEvent {
	dateTimeOccured: Date;
	serializedFruit: string;
	mutationType: keyof typeof FRUIT_MUTATION_EVENT;

	constructor(fruit: Fruit, mutationType: keyof typeof FRUIT_MUTATION_EVENT) {
		this.serializedFruit = JSON.stringify(fruit);

		this.dateTimeOccured = new Date();
		this.mutationType = mutationType;
	}

	getEntityID(): string {
		return (JSON.parse(this.serializedFruit) as Fruit).id;
	}
}
