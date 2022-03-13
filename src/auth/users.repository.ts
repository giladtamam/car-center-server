import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "./dto/update-user.dto";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {  password, email } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({  password: hashedPassword, email });
        try {
            await this.save(user);
        } catch (error) {
            console.log(error.code)
            const isDuplicate = error.code === '23505';
            if (isDuplicate) {
                throw new ConflictException('email already exist');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async updateAuthUser(updateUserDto: UpdateUserDto, userId: string): Promise<User> {
        return await this.save({
            id: userId,
            ...updateUserDto
        });
    }
}
