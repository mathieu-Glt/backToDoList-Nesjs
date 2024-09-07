import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepo } from './userRepo.spi';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepoImpl implements IUserRepo {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | null> {
    try {
      return this.userRepo.findOneBy({ id });
    } catch {
      throw new Error('Failed to find user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return this.userRepo.findOneBy({ email }) || null;
    } catch {
      throw new Error('Failed to find user');
    }
  }

  async exists(email: string): Promise<boolean> {
    try {
      return this.userRepo.existsBy({ email });
    } catch {
      throw new Error('Failed to check if user exists');
    }
  }

  async save(userDTO: CreateUserDTO): Promise<User> {
    const user = this.userRepo.create(userDTO);
    try {
      await this.userRepo.save(user);
    } catch {
      await this.userRepo.delete(user);
      throw new Error('Failed to save user');
    }

    return user;
  }

  async updateRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<void> {
    try {
      await this.userRepo.update(userId, { refreshToken });
    } catch {
      throw new Error('Failed to create refresh token');
    }
  }
}