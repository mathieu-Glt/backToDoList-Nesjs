import {
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { TaskList } from './entity/taskList.orm-entity';
import { ITaskListRepo } from './repo/taskList.spi';
import { CreateTaskListDTO } from './dto/createTaskListRepo.dto';
import { IUserRepo } from '../user/repo/userRepo.spi';
  
  @Injectable()
  export class TaskListService {
  
    public constructor(
        @Inject('ITaskListRepo')
        private readonly taskListRepo: ITaskListRepo,
        @Inject('IUserRepo')
        private readonly userRepo: IUserRepo,
    ) {
  }



  async saveTaskList({ title, userId }: CreateTaskListDTO): Promise<TaskList> {

    const user = await this.userRepo.findById(userId);

    if(!user) throw new NotFoundException('User not found');

    const existingTaskList = await this.taskListRepo.findByTitle(title, userId);

    if(existingTaskList) throw new ConflictException('taskList with same title already exists');


    const taskList = new TaskList();
    taskList.title = title;
    taskList.user = user;

    return await this.taskListRepo.save(taskList);

  }

  async getAllTaskList(userId: number): Promise<TaskList[]> {
    

    const user = await this.userRepo.findById(userId);

    if(!user) throw new NotFoundException('User not found');

    return await this.taskListRepo.findAll(user.id);

    
  }


  async getTaskList(dto:{id: number, userId: number}): Promise<TaskList> {

    const taskList = await this.taskListRepo.findById(dto.id, dto.userId);

    if(!taskList) throw new NotFoundException('The task list not found');

    return taskList;


  }

  async deleteTaskList(dto:{ id: number, userId: number}): Promise<void> {

    const taskList = await this.taskListRepo.findById(dto.id, dto.userId);

    if(!taskList) throw new NotFoundException('The task list not found');

    await this.taskListRepo.delete(dto.id, dto.userId)
  }
}
  