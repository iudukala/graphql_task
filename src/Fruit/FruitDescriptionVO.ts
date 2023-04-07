import { ValueObject } from '../core/ValueObject';

export class FruitDescriptionVO extends ValueObject<string> {
	constructor(nameArg: string | null) {
		super(nameArg);
	}
}
