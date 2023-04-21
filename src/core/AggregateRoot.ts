import { DomainEventManager } from './DomainEventManager.js';
import { Entity } from './Entity.js';
import { DomainEvent } from './DomainEvent.js';

export abstract class AggregateRoot<T> extends Entity<T> {
	private _domainEvents: Array<DomainEvent> = [];

	get domainEvents(): DomainEvent[] {
		return this._domainEvents;
	}

	protected addDomainEvent(event: DomainEvent): void {
		this.domainEvents.push(event);
		DomainEventManager.markAggregateForDispatch(this);
	}
}
