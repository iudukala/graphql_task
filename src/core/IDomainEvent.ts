import { Entity } from './Entity.js';

export interface IDomainEvent {
	dateTimeOccured: Date;
	getEntityID: () => Entity<unknown>['id'];
}
