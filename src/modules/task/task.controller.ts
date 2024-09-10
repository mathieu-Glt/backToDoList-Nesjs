import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDTO } from "./dto/createTaskRepo.dto";
import { Task } from "./entity/task.orm-entity";
import { handleError } from "src/shared/utils/error-handler.util";
import { UpdateTaskDTO } from "./dto/updateTaskRepo.dto";




@Controller({
    path: 'task',
    version: '1',
})
export class TaskController {
    constructor(
        @Inject(TaskService)
        private readonly taskService: TaskService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createTask(
        @Body() dto: CreateTaskDTO,
    ): Promise<Task> {
        try {
            
            return this.taskService.saveTask(dto);
        } catch (error) {
            handleError(error);
        }
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateTask(
        @Param('id') id: number,
        @Body() dto: UpdateTaskDTO,
    ): Promise<Task> {
        try {
           return this.taskService.updateTask(id, dto) 
        } catch (error) {
            handleError(error);

        }
    }

    @Get(':listTask')
    @HttpCode(HttpStatus.OK)
    async getAllTask(
    @Param('listTask') listTask: number,
    ): Promise<Task[]> {
      try {

        return await this.taskService.getAllTask(listTask)

      } catch (error) {
        handleError(error);

      }
    }

    @Get(':taskId/task')
    @HttpCode(HttpStatus.OK)
    async getTask(
    @Param('taskId') taskId: number,
    ): Promise<Task> {
      try {

        return await this.taskService.getTask(taskId)

      } catch (error) {
        handleError(error);

      }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteTask(
    @Param('taskId') taskId: number,
    ): Promise<void> {
      try {

        return await this.taskService.deleteTask(taskId)

      } catch (error) {
        handleError(error);

      }
    }




}