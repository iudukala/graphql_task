import { ValueObject } from './ValueObject';

export class DescriptionValueObject extends ValueObject<string> {
	constructor(nameArg: string | null) {
		super(nameArg);
	}
}
