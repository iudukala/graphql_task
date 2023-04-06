export abstract class Entity<T> {
	protected readonly _id: string;
	protected props: T;

	constructor(id: string, propsArg: T) {
		this._id = id;
		this.props = propsArg;
	}
}
