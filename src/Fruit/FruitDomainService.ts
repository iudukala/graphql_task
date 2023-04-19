import { FruitRepo } from './FruitRepository.js';

export class FruitService {
	private readonly repo: FruitRepo;

	constructor(repo: FruitRepo) {
		this.repo = repo;
	}

	public async doesExist(fruitName: string): Promise<boolean> {
		return await this.repo.exists(fruitName);
	}
}
