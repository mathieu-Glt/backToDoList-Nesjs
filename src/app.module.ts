import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListTaskModule } from './modules/listTasks/listTask.module';
import { ListTask } from './modules/listTasks/entity/listTask.entity';
import { TaskModule } from './modules/task/task.module';
import { Task } from './modules/task/entity/task.entity';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { HttpErrorFilter } from './shared/core/HttpErrorFilter';
import { LoggingInterceptor } from './shared/core/LoggingReqInterceptor';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
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
      entities: [User, ListTask, Task], 
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpErrorFilter,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
