import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcryptjs'
import { SignInUserDto } from "./dto/signin-user.dto";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import { getTokenInterface } from "./interface/token.interface";
import { signInResponseInterface } from "./interface/response.interface";



@Injectable()
export class UserService { 
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private configService: ConfigService
    ) {}


    /**
     * Create user profile 
     * @param body - createUserDto
     */

    async createUser(createUserDto: CreateUserDto): Promise<User | InternalServerErrorException> {

        try {
            const { firstname, lastname, email, password } = createUserDto;

            // Hash the password before saving it to the database
            const hashedPasswordToDatabase = await bcrypt.hash(password, 10);
    
            const newUserToDatabase = this.userRepository.create({
                firstname,
                lastname,
                email,
                password: hashedPasswordToDatabase,
            })
    
            return this.userRepository.save(newUserToDatabase)
    
        } catch (error) {

            console.error('Error creating user:', error.message);
            throw new InternalServerErrorException('Failed to create user');
        }

    }

    /**
     * User login.
     * @param body - signInUserDto
     */

    async signIn(signInUserDto: SignInUserDto): Promise<signInResponseInterface | InternalServerErrorException> {

        try {
            const { email, password } = signInUserDto;
            console.log('==================================== user.service ~ signIn');
            console.log(email, password);
            console.log('==================================== user.service');
            const user = await this.userRepository.findOne({ where: { email } });
            console.log('==================================== user.service ~ signIn');
            console.log(email, password);
            console.log('==================================== user.service');


            if (!user) throw new UnauthorizedException('Invalid credentials');

            if(!await bcrypt.compare(password, user.password)) throw new UnauthorizedException('Invalid credentials')
            

            user.password = "";

            const tokens = await this.getTokens(user);
            console.log('==================================== user.service ~ signIn');
            console.log(tokens);
            console.log('==================================== user.service');


            return {
                user,
                tokens
            }
    

        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new InternalServerErrorException('Failed to create user');

        }
    }


     /**
     * Generates and returns access and refresh tokens 
     * @param userId - user ID 
     * @param email - user email.
     */
    async getTokens(user: User): Promise<getTokenInterface> {

        const jwtSecret = this.configService.get<string>('JWT_SECRET')!;
        const jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET')!;

        const userCheck = {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
         }


         console.log('userCheck', userCheck);

        if (!jwtSecret || !jwtRefreshSecret) {
            throw new Error('JWT secrets are not defined');
        }
        // Sign and generate access and refresh tokens asynchronously
        const [accessToken, refreshToken] = await Promise.all([
            // Generate the access token
            this.jwtService.signAsync(
                {
                    sub: userCheck.id,
                    email: userCheck.email,
                    firstname: userCheck.firstname,
                    lastname: userCheck.lastname,
                },
                {
                    secret: jwtSecret,
                    expiresIn: '2h',
                },
            ),
            // Generate refresh tokens
            this.jwtService.signAsync(
                {
                    sub: userCheck.id,
                    email: userCheck.email,
                    firstname: userCheck.firstname,
                    lastname: userCheck.lastname,
                },
                {
                    secret: jwtRefreshSecret,
                    expiresIn: '7d',
                },
            ),
        ]);
        return {
            accessToken,
            refreshToken,
        }

    }

    /**
    * Find a user by their ID.
    * @param id - The ID of the user to find.
    * @returns A promise that resolves to the found user.
    */
    async findUser(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
            })

            if(!user) throw new NotFoundException('User not found')

            return user;
            
        } catch (error) {
            throw new Error('Problem during operation');

        }
    }








}