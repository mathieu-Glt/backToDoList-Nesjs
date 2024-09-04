import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import { ResponsesErrorInterface, ResponsesSuccessInterface } from "./interface/response.interface";


@Controller('users')


export class UserController {
    constructor(private readonly userService: UserService) {}
    /**
    *  User Controller
    * User register
    * @param  body - createUserDto
    * POST - api/users
    */
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
        
    try {
        const createUser = await this.userService.createUser(createUserDto);

        return { status: 201, error: false, message: 'User has been created', results: User}

    } catch (error) {
        return { status: 500, error: true, message: error };
    }

    }

    /**
    *  User Controller
    * User login
    * @param  body - signInUserDto
    * POST - api/login
    */
    @Post('login')
    async login(@Body() signInUserDto: any): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
        try {

           const loginUser = await this.userService.signIn(signInUserDto);


           return { status: 200, error: false, message: `You're well connected`, results: loginUser}

        } catch (error) {
            return { status: 500, error: true, message: error };

        }
    }


}


