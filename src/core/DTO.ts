/**
 * data transfer object implemented as a generic type
 */
/** @template T */
export abstract class DTO<T> {
	readonly id: string;
	readonly props: T;

	/**
	 *
	 * @param {string} idArg unique identifier
	 * @param {T} propsArg object containing the DTO's props
	 */
	constructor(idArg: string, propsArg: T) {
		this.id = idArg;

		// todo: try to make object immutable properly
		this.props = Object.freeze(propsArg);
	}
}
