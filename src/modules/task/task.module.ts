import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entity/task.orm-entity";
import { TaskController } from "./task.controller";
import { TaskListModule } from "../taskList/taskList.module";
import { TaskRepoImpl } from "./repo/task.Repo.impl";
import { TaskService } from "./task.service";






@Module({
    controllers: [TaskController],
    imports: [TypeOrmModule.forFeature([Task]), TaskListModule],
    providers: [
        {
            provide: 'ITaskRepo',
            useClass: TaskRepoImpl
        },
        TaskService
    ],
    exports: []
})
export class TaskModule {}
