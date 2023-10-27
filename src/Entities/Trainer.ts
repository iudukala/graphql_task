import { Entity } from '../core/Entity';
import { TrainerDTO } from './TrainerDTO';
import { TrainerKey } from './TrainerKeys';

export class Trainer extends Entity {
	private constructor(trainerDTO: TrainerDTO) {
		[TrainerKey.Name]: trainerDTO.name.trim(),
	}
}
