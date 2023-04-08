/** @template T */
export abstract class Entity<T> {
	protected readonly id: string;
	protected props: T;

	/**
	 *
	 * @param {string} idArg unique identifier of the entity.
	 * @param {T} propsArg object containing the entity's data
	 */
	constructor(idArg: string, propsArg: T) {
		this.id = idArg;
		this.props = Object.freeze(propsArg);
	}
}
