// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Task } from './entity/task.entity';
// import { ListTaskModule } from 'src/modules/listTasks/listTask.module';
// import { TaskController } from './task.controller';
// import { TaskService } from './task.service';
// import { ListTask } from 'src/modules/listTasks/entity/listTask.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Task, ListTask]),
//     ListTaskModule, // I import ListTaskModule for to use ListTaskService
//   ],
//   controllers: [TaskController],
//   providers: [TaskService],
//   exports: [TaskService],
// })
// export class TaskModule {}
