import { Entity } from './Entity.js';
import { IDomainEvent } from './IDomainEvent.js';

export abstract class AggregateRoot<T> extends Entity<T> {
	private domainEvents: Array<IDomainEvent> = [];

	protected addDomainEvent(domainEvent: IDomainEvent): void {
		this.domainEvents.push(domainEvent);
	}
}
