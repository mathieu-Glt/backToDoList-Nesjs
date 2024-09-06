import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserRepoImpl } from './repo/userRepo.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.orm-entity';

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
    },
  ],
  exports: ['IUserRepo'],
})
export class UserModule {}
