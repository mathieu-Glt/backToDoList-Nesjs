import { CreateUserDTO } from "../dto/create-user.dto";
import { User } from "../entity/user.orm-entity.ts";

export interface IUserRepo {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  exists(email: string): Promise<boolean>;
  save(user: CreateUserDTO): Promise<User>;
  updateRefreshToken(refreshToken: string, userId: number): Promise<void>;
}