import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entity/user.orm-entity';
import { UserModule } from './modules/user/user.module';
import { TaskList } from './modules/taskList/entity/taskList.orm-entity';
import { AuthModule } from './modules/auth/auth.module';
import { Task } from './modules/task/entity/task.orm-entity';
import { HttpErrorFilter } from './shared/core/HttpErrorFilter';
import { LoggingInterceptor } from './shared/core/LoggingReqInterceptor';
import { AuthGuard } from './modules/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TaskListModule } from './modules/taskList/taskList.module';
import { TaskModule } from './modules/task/task.module';

// I adhere to SOLID principles for this project,
// but I choose to use certain dependencies directly in a few services,
// such as bcrypt or Nest's built-in tools.
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    TaskListModule,
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'todolist_db',
      entities: [User, TaskList, Task],
      synchronize: true,
    }),
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpErrorFilter,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
