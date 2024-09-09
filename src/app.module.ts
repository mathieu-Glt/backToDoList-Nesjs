import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ListTaskModule } from './modules/listTasks/listTask.module';
import { TaskList } from './modules/listTasks/entity/listTask.entity';
// import { TaskModule } from './modules/task/task.module';
import { Task } from './modules/task/entity/task.orm-entity.ts';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entity/user.orm-entity.ts';
import { ConfigModule } from '@nestjs/config';
import { HttpErrorFilter } from './shared/core/HttpErrorFilter';
import { LoggingInterceptor } from './shared/core/LoggingReqInterceptor';
import { AuthGuard } from './modules/auth/auth.guard';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    // ListTaskModule,
    // TaskModule,
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
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
