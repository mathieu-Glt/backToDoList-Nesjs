import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserRepoImpl } from './repo/userRepo.impl';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    {
      provide: 'IUserRepo',
      useClass: UserRepoImpl,
    }
  ],
  exports: ['IUserRepoImpl'], 
})
export class UserModule {}
