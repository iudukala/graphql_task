import mongoose from 'mongoose';
import { FruitMutatedEvent } from '../../Fruit/events/FruitMutatedEvent.js';

export const DomainEventModel = mongoose.model(
	'domain_event',
	new mongoose.Schema<FruitMutatedEvent>({
		eventClass: String,
		serializedFruit: String,
		dateTimeOccured: Date,
		mutationType: String,
	}),
	'tr_outbox',
);
