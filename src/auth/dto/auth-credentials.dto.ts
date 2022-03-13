
import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';
export class AuthCredentialsDto {

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak',
    }) 
    password: string;

    @IsEmail()
    email: string;
}