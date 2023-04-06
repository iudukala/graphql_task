// export abstract class Entity<T> {
export abstract class Entity {
	protected readonly _id: string;

	constructor(id: string) {
		this._id = id;
	}
}
