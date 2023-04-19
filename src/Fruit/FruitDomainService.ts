import { FruitRepo } from './FruitRepository.js';
import { FruitModelType } from './types.js';

export class FruitService {
	private readonly repo: FruitRepo;

	constructor(repo: FruitRepo) {
		this.repo = repo;
	}

	public async ensureUnique(fruitName: string): Promise<boolean> {
		const target: FruitModelType = await this.repo.findFruitByName(fruitName);
		console.log(JSON.stringify(target));

		return !!target;
	}
}
