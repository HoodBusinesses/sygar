import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class ResetPasswordRequestDto {
    @IsEmail()
    email!: string;
}

export class ResetPasswordDto {
    @IsString()
    @MinLength(8)
    newPassword!: string;

    @IsString()
    @IsNotEmpty()
    token!: string;
}
