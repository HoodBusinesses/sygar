import { IsString, IsNotEmpty, MinLength } from "class-validator";

/**
 * DTO for activating an account
 */
export class ActivateAccountDto {
    @IsString()
    @IsNotEmpty()
    token!: string;

    @IsString()
    @MinLength(8)
    password!: string;
}

/**
 * DTO for validating a token
 */
export class ValidateTokenDto {
    @IsString()
    @IsNotEmpty()
    token!: string;
}