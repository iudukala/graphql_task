import mongoose from 'mongoose';
import { DomainEventModel } from '../infrastructure/persistence/DomainEventModel.js';
import { DomainEvent } from './DomainEvent.js';
import { Entity } from './Entity.js';

/**
 * abstract class for entities that act as the aggregate root. not functionally necessary currently since the domain only contains one entities.
 */
export abstract class AggregateRoot<T> extends Entity<T> {
	public async addDomainEvent(
		event: DomainEvent,
		session?: mongoose.mongo.ClientSession,
	): Promise<void> {
		await new DomainEventModel(event).save({ session: session });
	}
}
