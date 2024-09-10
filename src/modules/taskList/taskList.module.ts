import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TaskList } from './entity/taskList.orm-entity';
import { TaskListController } from './taskList.controller';
import { TaskListService } from './taskList.service';
import { TaskListRepoImpl } from './repo/taskListRepo.impl';

@Module({
  controllers: [TaskListController],
  imports: [TypeOrmModule.forFeature([TaskList]), UserModule],
  providers: [
    {
      provide: 'ITaskListRepo',
      useClass: TaskListRepoImpl
    },
    TaskListService
],
  exports: ['ITaskListRepo'],
})
export class TaskListModule {}


