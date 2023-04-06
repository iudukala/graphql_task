/** @template T */
export abstract class Entity<T> {
	protected readonly _id: () => string;
	protected props: T;

	/**
	 *
	 * @param {() => string} id a function that returns the identifier of the entity. a function is used instead of a constant value to avoid duplicating data in instances where the identifier may be a field that's inside the var props
	 * @param {T} propsArg object containing the data pertaining to the entity
	 */
	constructor(id: () => string, propsArg: T) {
		this._id = id;
		this.props = Object.freeze(propsArg);
	}
}
