import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.orm-entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
