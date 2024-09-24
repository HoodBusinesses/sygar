import { IsNotEmpty, IsNumber, IsString } from "class-validator";

// DTO for create organization
export class CreateOrganizationDto {
	@IsNotEmpty()
	@IsString()
	cnss!: string;

	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNumber()
	freeTrial!: number;
}


// Table Organization {
//   // organization have users
//   // organization have bills
//   uid uuid pk
//   cnss text unique
//   freeTrial datetime
//   id integer // counter starting from 0
//   key text // YYYYMMDDCCCC
//   name text  
//   createdAt datetime
//   updateAt datetime
// }