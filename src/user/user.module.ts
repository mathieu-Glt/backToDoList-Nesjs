import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule.forRoot({ isGlobal: true }), JwtModule.register({ global: true, secret: 'secret', signOptions: { expiresIn: '3600s'} })],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService] // Export UserService if other modules need it
})
export class UserModule {}
