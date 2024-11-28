import { IsNumber, IsNumberString, IsString, Max, Min } from "class-validator";

export class CreateThemeDto {

	@IsString()
	name!: string;

	@IsNumberString()
	price!: string;

	@IsNumberString()
	year!: string;


}
