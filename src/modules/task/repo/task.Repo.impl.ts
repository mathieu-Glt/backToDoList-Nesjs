import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ITaskRepo } from "./task.spi";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entity/task.orm-entity";
import { Repository } from "typeorm";





@Injectable()
export class TaskRepoImpl implements ITaskRepo {
    public constructor(
        @InjectRepository(Task)
        private taskRepo: Repository<Task>
    ) {}

    async save(task: Task): Promise<Task> {

        const newTask = this.taskRepo.create(task);

        try {
            await  this.taskRepo.save(newTask);
        } catch (error) {
            await  this.taskRepo.delete(newTask);

            throw new InternalServerErrorException('Fail to save task')

        }

        return newTask;
    }

    async update(id: number, updatedTask: Partial<Task>) {
        try {
            const task = await this.taskRepo.findOne({ where: { id }});

            if(!task) {
                throw new NotFoundException('Not found task')
            }

            const newTask = { ...task, ...updatedTask }
            await this.taskRepo.save(newTask);

            return newTask;
        } catch (error) {
            throw new InternalServerErrorException('Fail to update task')
        }
    }




    async findAll(taskListId: number): Promise<Task[]> {
        try {
            return await this.taskRepo.find({ where: { listTask: { id: taskListId}}})
        } catch (error) {
            throw new InternalServerErrorException('Fail to get tasks')

        }
    }

    async findById(id: number): Promise <Task> {
        try {
            return await this.taskRepo.findOne({ where: {id: id }})
        } catch (error) {
            throw new InternalServerErrorException('Fail to get task')

        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.taskRepo.delete(id)
        } catch (error) {
            throw new InternalServerErrorException('Fail to delete task')

        }
    }

}