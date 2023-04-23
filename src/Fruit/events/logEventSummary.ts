import { DomainEvent } from '../../core/DomainEvent.js';
import { Fruit } from '../Fruit.js';
import { FruitMutatedEvent } from './FruitMutatedEvent.js';

export const logEventSummary = (eventArg: DomainEvent): void => {
	const event = eventArg as FruitMutatedEvent;

	console.log(
		'events consumed: ' +
			JSON.stringify({
				event: event.eventClass,
				type: event.mutationType,
				fruitname: (JSON.parse(event.serializedFruit) as Fruit).props.name,
			}),
	);
};
