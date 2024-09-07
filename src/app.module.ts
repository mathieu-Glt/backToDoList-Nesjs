import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { ListTaskModule } from './listTasks/listTask.module';
import { ListTask } from './listTasks/entity/listTask.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/entity/task.entity';
@Global()
@Module({
  imports: [
    UserModule,
    ListTaskModule,
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'todolist_db',
      entities: [User, ListTask, Task], // In array add entities
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, ListTask, Task]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
