import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ITaskListRepo } from "../taskList/repo/taskList.spi";
import { ITaskRepo } from "./repo/task.spi";
import { CreateTaskDTO } from "./dto/createTaskRepo.dto";
import { Task } from "./entity/task.orm-entity";
import { UpdateTaskDTO } from "./dto/updateTaskRepo.dto";







@Injectable()
export class TaskService {
    
    public constructor(
        @Inject('ITaskRepo')
        private readonly taskRepo: ITaskRepo,
        @Inject('ITaskListRepo')
        private readonly taskListRepo: ITaskListRepo,
    ) { }

    async saveTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        const { longDescription, shortDescription, status, endAt, listTask } = createTaskDto
        
        const taskList = await this.taskListRepo.findByIdListTask(listTask);

        if(!taskList) {
            throw new NotFoundException('Task list not found');
        }

        const task = new Task();
        task.longDescription = longDescription;
        task.shortDescription = shortDescription;
        task.status = status;
        task.endAt = endAt;
        task.listTask = taskList;


        return await this.taskRepo.save(task);
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDTO): Promise<Task> {
        // const { longDescription, shortDescription, status, endAt  } = updateTaskDto

        const updatedTask: Partial<Task> = {
            ...updateTaskDto
        }

        const task = await this.taskRepo.update(id, updatedTask);

        if(!task) {
            throw new NotFoundException('task not found')
        }

        return task;
    }

    async getAllTask(taskListId: number): Promise<Task[]> {

        const taskList = await this.taskListRepo.findByIdListTask(taskListId);

        if(!taskList) throw new NotFoundException('TaskList not found');

        return await this.taskRepo.findAll(taskList.id);
    }

    async getTask(id: number): Promise<Task> {

        const task = await this.taskRepo.findById(id);

        if(!task) throw new NotFoundException('task not found')


        return task;
    }
    
    async deleteTask(id: number): Promise<void> {
        const task = await this.taskRepo.findById(id);
        console.log('====================================');
        console.log(task);
        console.log('====================================');

        if(!task) throw new NotFoundException('Task not found')

        await this.taskRepo.delete(id)
    }
    
}

