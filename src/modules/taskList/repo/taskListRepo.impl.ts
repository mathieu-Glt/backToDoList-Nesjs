import { InjectRepository } from "@nestjs/typeorm";
import { ITaskListRepo } from "./taskList.spi";
import { TaskList } from "../entity/taskList.orm-entity";
import { Repository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";





@Injectable()
export class TaskListRepoImpl implements ITaskListRepo{
    public constructor(
        @InjectRepository(TaskList)
        private taskListRepo: Repository<TaskList>
    ) { }

    async save(taskList: TaskList): Promise<TaskList> {

        const newTaskList = this.taskListRepo.create(taskList);


        const existingTaskList = await this.findByTitle(newTaskList.title, newTaskList.user.id);

        if(!existingTaskList) {
            try {
               await this.taskListRepo.save(newTaskList);
            } catch (error) {
                await this.taskListRepo.delete(newTaskList);

                throw new InternalServerErrorException('Fail to save task list')
            }
        } else {
            await this.taskListRepo.update(existingTaskList.id, newTaskList)
        }
        
        return newTaskList;
    }


    async findByTitle(title: string, userId: number): Promise<TaskList> {
        try {
            return  await this.taskListRepo.findOne({ where: { title, id: userId } });

        } catch (error) {
            throw new InternalServerErrorException('Fail to get taskList');
        }
        
    }

    async findAll(userId: number): Promise<TaskList[]> {
        try {
            return await this.taskListRepo.find({ where: { user: { id: userId}}})
        } catch (error) {
            throw new InternalServerErrorException('Fail to get taskLists');
 
        }
    }


    async findById(id: number, userId: number): Promise<TaskList> {
        try {
            return await this.taskListRepo.findOne({ where: { id: id, user: { id: userId} }}) 
        } catch (error) {
            throw new InternalServerErrorException('Fail to get taskList');

        }
    }

    async findByIdListTask(id: number): Promise<TaskList> {
        try {
            return await this.taskListRepo.findOne({ where: { id: id } })
        } catch (error) {
            throw new InternalServerErrorException('Fail to get taskList');

        }

    }

    async delete(id: number, userId: number): Promise<void> {
        try {
            await this.taskListRepo.delete({ id, user: { id: userId }})
        } catch (error) {
            throw new InternalServerErrorException('Fail to delete taskList');

        }
    }


}