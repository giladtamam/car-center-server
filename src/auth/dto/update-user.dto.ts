import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';
export class UpdateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    display_name: string;
}