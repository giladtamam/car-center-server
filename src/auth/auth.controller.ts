import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string, user: User }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Get('/user')
    @UseGuards(AuthGuard())
    async getAuthUser(@GetUser() user: User): Promise<User> {
        const { password, ...restUser} = user;
        return restUser;
    }

    @Patch('/user')
    @UseGuards(AuthGuard())
    async updateAuthUser(
        @Body() updateUserDto: UpdateUserDto,
        @GetUser() user: User): Promise<User> {
        return this.authService.updateAuthUser(updateUserDto, user.id);
    }
}
