import { ValueObject } from '../core/ValueObject.js';

export class FruitDescriptionVO extends ValueObject<string> {
	constructor(nameArg: string | null) {
		super(nameArg);
	}
}
