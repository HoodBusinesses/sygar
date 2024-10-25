import { IsArray, IsEnum, isEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Animator } from "../model/animator.model";
import { Formateur } from "../model/formateur.model";
import { Type } from "class-transformer";
import { Participant } from "../model/participant.model";
import { GroupAction } from "../model/group.model";

export class CreateGroupDto {
	@IsNotEmpty()
	@IsString()
	themeId!: string;

	@IsOptional()
	@IsArray()
	animatorsUid?: string[];

	@IsOptional()
	@IsArray()
	animators?: Animator[];

	@IsOptional()
	@IsString()
	formateurUid?: string;

	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => Formateur)
	formateur?: Formateur;

	@IsNotEmpty()
	@IsString()
	theme!: string;

	@IsNotEmpty()
	@IsString()
	location!: string;

	@IsOptional()
	@IsArray()
    participantsUid?: string[];

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Participant)
    participants?: Participant[];

	@IsNotEmpty()
	@IsEnum(GroupAction)
    action!: GroupAction;
}
