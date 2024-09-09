import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Req } from "@nestjs/common";
import { handleError } from "src/shared/utils/error-handler.util";
import { CreateTaskListRequestDTO } from "./dto/createTaskListRepo.dto";
import { TaskList } from "./entity/taskList.orm-entity";
import { TaskListService } from "./taskList.service";
import { Request } from "express";



@Controller({
    path: 'task-list',
    version: '1',
  })
  export class TaskListController {
    constructor(
      @Inject(TaskListService)
      private readonly taskListService: TaskListService,
    ) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createTask(
      @Body() dto: CreateTaskListRequestDTO,
      @Req() req: Request,
    ): Promise<TaskList> {
      try {
        const userId = req.user.id;
  
        return await this.taskListService.saveTaskList({
          ...dto,
          userId,
        });
      } catch (error) {
        handleError(error);
      }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllTaskList(
      @Req() req: Request,
    ): Promise<TaskList[]> {
      try {
        const userId = req.user.id;

        return await this.taskListService.getAllTaskList(userId)

      } catch (error) {
        handleError(error);

      }
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getTaskList(
      @Param('id') id: number,
      @Req() req: Request,
    ): Promise<TaskList> {
      try {
        const userId = req.user.id;

        return await this.taskListService.getTaskList({id, userId})

      } catch (error) {
        handleError(error);

      }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteTaskList(
      @Param('id') id: number,
      @Req() req: Request,
    ): Promise<void> {
      try {
        const userId = req.user.id;

        return await this.taskListService.deleteTaskList({id, userId})
      } catch (error) {
        handleError(error);

      }
    }
  }