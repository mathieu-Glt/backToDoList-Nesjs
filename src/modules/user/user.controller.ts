import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import {
  ResponsesErrorInterface,
  ResponsesSuccessInterface,
} from './interface/response.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * User Controller - Handles user registration and account creation.
   * Endpoint to register a new user.
   * POST - api/users/register
   * @summary Registers a new user.
   * @param {CreateUserDto} createUserDto - The data transfer object containing the details required to register a new user (e.g., username, email, password).
   * @returns {Promise<ResponsesSuccessInterface | ResponsesErrorInterface>} - A promise that resolves to either:
   *  - Success: An object containing the status (201), a success message, and details of the newly created user.
   *  - Error: An object containing the status (500), an error message, and error details if something goes wrong.
   * @throws {500 Internal Server Error} - If there is any issue during the user registration process.
   * @throws {400 Bad Request} - If the input data is invalid or incomplete.
   */

  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
    try {
      const createUser = await this.userService.createUser(createUserDto);

      return {
        status: 201,
        error: false,
        message: 'User has been created',
        results: User,
      };
    } catch (error) {
      return { status: 500, error: true, message: error };
    }
  }

  /**
   * User Controller - Handles user authentication and login.
   * Endpoint to log in a user.
   * POST - api/login
   * @summary Logs in a user by validating credentials.
   * @param {SignInUserDto} signInUserDto - The data transfer object containing the user's login credentials (e.g., email and password).
   * @returns {Promise<ResponsesSuccessInterface | ResponsesErrorInterface>} - A promise that resolves to either:
   *  - Success: An object containing the status (200), a success message, and the user session data (e.g., token, user details).
   *  - Error: An object containing the status (500), an error message, and error details if something goes wrong.
   * @throws {401 Unauthorized} - If the provided credentials are invalid or the user is not authenticated.
   * @throws {500 Internal Server Error} - If there is any issue during the login process.
   */

  @Post('login')
  async login(
    @Body() signInUserDto: any,
  ): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
    try {
      const loginUser = await this.userService.signIn(signInUserDto);

      return {
        status: 200,
        error: false,
        message: `You're well connected`,
        results: loginUser,
      };
    } catch (error) {
      return { status: 500, error: true, message: error };
    }
  }
}
