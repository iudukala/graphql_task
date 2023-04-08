/** @template T */
export abstract class Entity<T> {
	readonly id: string;
	readonly props: T;

	/**
	 *
	 * @param {string} idArg unique identifier of the entity.
	 * @param {T} propsArg object containing the entity's data
	 */
	constructor(idArg: string, propsArg: T) {
		this.id = idArg;

		// todo: try to make object immutable properly
		this.props = Object.freeze(propsArg);
	}
}
