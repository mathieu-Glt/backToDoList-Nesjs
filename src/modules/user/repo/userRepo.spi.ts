import { User } from '../entity/user.orm-entity';

export interface IUserRepo {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  exists(email: string): Promise<boolean>;
  save(user: User): Promise<User>;
  updateRefreshToken(refreshToken: string, userId: number): Promise<void>;
}
