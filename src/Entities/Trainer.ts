import { Entity } from '../core/Entity';
import { TrainerPropsDTO } from './TrainerPropsDTO';
import { TrainerKey } from './TrainerKeys';
import { DTO } from '../core/DTO';

// the type parameter used by the entity will contain value objects later. using the dto type for now
export class Trainer extends Entity<TrainerPropsDTO> {
	private constructor(trainerDTO: DTO<TrainerPropsDTO>) {
		super(trainerDTO.id, {
			[TrainerKey.Name]: trainerDTO.props.name.trim(),
			[TrainerKey.Birthday]: trainerDTO.props.birthday,
			[TrainerKey.ExperienceYears]: trainerDTO.props.experience_years,
		});
	}
}
