import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../entity/user.orm-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepo } from './userRepo.spi';

@Injectable()
export class UserRepoImpl implements IUserRepo {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | null> {
    try {
      return await this.userRepo.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to find user by id: ${error.toString()}`,
      );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return (await this.userRepo.findOneBy({ email })) || null;
    } catch {
      throw new InternalServerErrorException(
        `Failed to find user by email: ${email}`,
      );
    }
  }

  async exists(email: string): Promise<boolean> {
    try {
      return await this.userRepo.existsBy({ email });
    } catch {
      throw new InternalServerErrorException(
        `Failed to check if user exists by email: ${email}`,
      );
    }
  }

  async save(user: User): Promise<User> {
    const newUser = this.userRepo.create(user);
    try {
      await this.userRepo.save(newUser);
    } catch (error) {
      await this.userRepo.delete(user);
      throw new InternalServerErrorException(
        `Failed to create user: ${error.toString()}`,
      );
    }

    return user;
  }

  async updateRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<void> {
    try {
      await this.userRepo.update(userId, { refreshToken });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update refresh token: ${error.toString()}`,
      );
    }
  }
}
