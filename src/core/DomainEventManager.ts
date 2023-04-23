import cron from 'node-cron';
import { DomainEventModel } from '../infrastructure/persistence/DomainEventModel.js';
import { connectDB } from '../infrastructure/persistence/connectDB.js';
import { DomainEvent } from './DomainEvent.js';

export class DomainEventManager {
	// time period of each cycle
	private static CRON_PERIOD_SEC = 10;

	private static handlersMap: Record<string, Array<(event: DomainEvent) => void>> = {};
	private static initialized = false;

	public static register(handler: (event: DomainEvent) => void, eventClassName: string): void {
		if (!Object.prototype.hasOwnProperty.call(DomainEventManager.handlersMap, eventClassName)) {
			this.handlersMap[eventClassName] = [];
		}

		this.handlersMap[eventClassName].push(handler);
	}

	static init(DB_URI: string): void {
		if (this.initialized) return;

		cron
			.schedule(`*/${this.CRON_PERIOD_SEC} * * * * *`, () => {
				this.dispatchEvents(DB_URI);
			})
			.start();
		this.initialized = true;
	}

	private static async dispatchEvents(DB_URI: string) {
		await connectDB(DB_URI);

		(await DomainEventModel.find()).forEach(event => {
			const eventClassName = event.eventClass;

			if (!Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)) {
				throw new Error('no handler found for event class ' + eventClassName);
			}

			this.handlersMap[eventClassName].forEach(async handler => {
				handler(event);

				// remove handled event from transactional outbox
				await event.deleteOne();
			});
		});
	}
}
