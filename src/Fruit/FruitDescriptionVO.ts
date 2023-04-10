import { ValueObject } from '../core/ValueObject.js';

export class FruitDescriptionVO extends ValueObject<string> {
	private constructor(nameArg: string | null) {
		super(nameArg);
	}

	static create(name: string | null | undefined): FruitDescriptionVO {
		if (name === undefined || name === null || name === '') return new FruitDescriptionVO(null);
		else if (name.length > 30)
			throw new Error('the description for a fruit cannot be beyond 30 characters');
		else return new FruitDescriptionVO(name);
	}
}
