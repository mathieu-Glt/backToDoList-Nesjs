import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { ListTaskModule } from './listTasks/listTask.module';
import { ListTask } from './listTasks/entity/listTask.entity';
@Global()
@Module({
  imports: [
    UserModule,
    ListTaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'todolist_db',
      entities: [User, ListTask], // In array add entities
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, ListTask]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
