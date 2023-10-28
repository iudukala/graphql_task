/**
 * type for the properties object contained within the DTO
 * ID is stored outside the props object (on the same level)
 * entity/dto object structure remains consistent across the system and is specified inn the readme
 */
export type TrainerPropsDTO = {
	name: string;
	birthday: Date;
	experience_years: number;
};
