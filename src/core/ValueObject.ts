export abstract class ValueObject<T> {
	public readonly value: T | null;

	constructor(valueArg: T | null) {
		// making value immutable
		this.value = Object.freeze(valueArg);
	}
}
