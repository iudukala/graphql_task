import { ValueObject } from '../core/ValueObject';

export class DescriptionValueObject extends ValueObject<string> {
	constructor(nameArg: string | null) {
		super(nameArg);
	}
}
