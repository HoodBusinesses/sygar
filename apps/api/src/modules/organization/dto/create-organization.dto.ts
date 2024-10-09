import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

// DTO for create organization
export class CreateOrganizationDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: '123456789', description: 'CNSS of the organization' })
	cnss!: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'My Organization', description: 'Name of the organization' })
	name!: string;

	@IsNumber()
	@ApiProperty({ example: 30, description: 'Free trial duration in days' })
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