import { Domain } from 'domain';
import { AggregateRoot } from './remove_AggregateRoot.js';
import { DomainEvent } from './DomainEvent.js';

export class DomainEventManager {
	private static handlersMap: Record<string, Array<(event: DomainEvent) => void>> = {};
	private static markedAggregates: Array<AggregateRoot<any>> = [];
	static ATOMIC_TRANSACTION_FLAG: boolean | undefined;

	/**
	 * @static
	 * @desc Called by aggregate root objects that have created domain
	 * events to eventually be dispatched when the infrastructure commits
	 * the unit of work.
	 */

	public static markAggregateForDispatch(aggregateArg: AggregateRoot<any>): void {
		// const aggregateFound = !!this.findMarkedAggregateByID(aggregateArg.id);
		const aggregateFound =
			DomainEventManager.markedAggregates.filter(aggrItem => aggrItem.id === aggregateArg.id)
				.length === 0;

		if (!aggregateFound) {
			this.markedAggregates.push(aggregateArg);
		}
	}

	private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
		aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event));
	}

	// private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
	// 	const index = this.markedAggregates.findIndex(a => a.equals(aggregate));
	// 	this.markedAggregates.splice(index, 1);
	// }

	// private static findMarkedAggregateByID(id: UniqueEntityID): AggregateRoot<any> { // 	let found: AggregateRoot<any> = null;
	// 	for (let aggregate of this.markedAggregates) {
	// 		if (aggregate.id.equals(id)) {
	// 			found = aggregate;
	// 		}
	// 	}

	// 	return found;
	// }

	// public static dispatchEventsForAggregate(id: UniqueEntityID): void {
	// 	const aggregate = this.findMarkedAggregateByID(id);

	// 	if (aggregate) {
	// 		this.dispatchAggregateEvents(aggregate);
	// 		aggregate.clearEvents();
	// 		this.removeAggregateFromMarkedDispatchList(aggregate);
	// 	}
	// }Array<

	public static register(handler: (event: DomainEvent) => void, eventClassName: string): void {
		if (!this.handlersMap.hasOwnProperty(eventClassName)) {
			this.handlersMap[eventClassName] = [];
		}
		this.handlersMap[eventClassName].push(handler);
	}

	// public static clearHandlers(): void {
	// 	this.handlersMap = {};
	// }

	// public static clearMarkedAggregates(): void {
	// 	this.markedAggregates = [];
	// }

	private static dispatch(event: DomainEvent): void {
		const eventClassName: string = event.constructor.name;

		if (this.handlersMap.hasOwnProperty(eventClassName)) {
			const handlers: any[] = this.handlersMap[eventClassName];
			for (let handler of handlers) {
				handler(event);
			}
		}
	}
}
