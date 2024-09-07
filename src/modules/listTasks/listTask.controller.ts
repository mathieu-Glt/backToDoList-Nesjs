import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateListTaskDto } from './dto/create-listTask.dto';
import { ListTask } from './entity/listTask.entity';
import { ListTaskService } from './listTask.service';
import {
  ResponsesErrorInterface,
  ResponsesSuccessInterface,
} from './interface/response.interface';
// import { ListTaskService } from "./listTask.service";

@Controller('list-tasks')
export class ListTaskController {
  constructor(private readonly listTaskService: ListTaskService) {}

  /**
   * ListTask Controller - Handles operations related to creating task lists.
   * Endpoint to create a new task list.
   * POST - api/list-tasks
   * @summary Creates a new task list.
   * @param {CreateListTaskDto} body - The data transfer object containing the details required to create a new task list.
   * @returns {Promise<ResponsesSuccessInterface | ResponsesErrorInterface>} - A promise that resolves to either:
   *  - Success: An object containing the status (201), a success message, and the details of the created task list.
   *  - Error: An object containing the status (500), an error message, and error details if something goes wrong.
   * @throws {500 Internal Server Error} - If there is any issue during the creation process.
   */

  @Post()
  async createListTask(
    @Body() createListTaskDto: CreateListTaskDto,
  ): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
    try {
      const listTaskCreate = await this.listTaskService.createTaskList(
        createListTaskDto,
      );
      return {
        status: 201,
        error: false,
        message: 'List task has been created',
        results: listTaskCreate,
      };
    } catch (error) {
      return { status: 500, error: true, message: error };
    }
  }

  /**
   * ListTask Controller - Handles operations related to creating task lists.
   * Endpoint to retrieve all task lists associated with a specific user.
   * GET - api/list-tasks/:userId
   * @summary Retrieves all task lists for a given user.
   * @param {number} userId - The ID of the user whose task lists are being requested.
   * @returns {Promise<ResponsesSuccessInterface | ResponsesErrorInterface>} - A promise that resolves to either:
   *  - Success: An object containing the status (200), a success message, and the task lists associated with the user.
   *  - Error: An object containing the status (500), an error message, and error details if something goes wrong.
   * @throws {500 Internal Server Error} - If there is any issue during the retrieval process.
   * @throws {404 Not Found} - If no task lists are found for the provided userId.
   *
   */

  @Get(':userId')
  async getAllListTask(
    @Param('userId') userId: number,
  ): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
    try {
      const listTask = await this.listTaskService.getAllListTask(userId);
      return {
        status: 200,
        error: false,
        message: 'List tasks found',
        results: listTask,
      };
    } catch (error) {
      return { status: 500, error: true, message: error };
    }
  }

  /**
   * ListTask Controller - Handles operations related to retrieving a single task list.
   * Endpoint to retrieve a specific task list by its ID.
   * GET - api/list-tasks/v1/:id
   * @summary Retrieves a single task list by ID.
   * @param {number} id - The ID of the task list to be retrieved.
   * @returns {Promise<ResponsesSuccessInterface | ResponsesErrorInterface>} - A promise that resolves to either:
   *  - Success: An object containing the status (200), a success message, and the details of the retrieved task list.
   *  - Error: An object containing the status (500), an error message, and error details if something goes wrong.
   * @throws {500 Internal Server Error} - If there is any issue during the retrieval process.
   * @throws {404 Not Found} - If no task list is found for the provided ID.
   */

  @Get('v1/:id')
  async getOneListTask(
    @Param('id') id: number,
  ): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
    console.log(
      '==================================== listTask controller ~ getAllListTask',
    );
    try {
      const listTask = await this.listTaskService.getOneListTask(id);
      console.log(
        '==================================== listTask controller ~ listTask',
        listTask,
      );
      return {
        status: 200,
        error: false,
        message: 'List task found',
        results: listTask,
      };
    } catch (error) {
      return { status: 500, error: true, message: error };
    }
  }

  /**
   * ListTask Controller - Handles operations related to deleting a task list.
   * Endpoint to delete a specific task list by its ID.
   * DELETE - api/list-tasks/:id
   * @summary Deletes a task list by ID.
   * @param {number} id - The ID of the task list to be deleted.
   * @returns {Promise<ResponsesSuccessInterface | ResponsesErrorInterface>} - A promise that resolves to either:
   *  - Success: An object containing the status (200), a success message, and details of the deleted task list.
   *  - Error: An object containing the status (500), an error message, and error details if something goes wrong.
   * @throws {500 Internal Server Error} - If there is any issue during the deletion process.
   * @throws {404 Not Found} - If the task list with the given ID is not found.
   */

  @Delete(':id')
  async deleteListTask(
    @Param('id') id: number,
  ): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
    try {
      const deleteListTask = await this.listTaskService.deleteListTask(id);
      console.log(
        '==================================== listTask id ~ deleteListTask',
        deleteListTask,
      );

      return {
        status: 200,
        error: false,
        message: 'List task found',
        results: deleteListTask,
      };
    } catch (error) {
      console.log(
        '==================================== listTask error ~ deleteListTask',
        error,
      );
      return { status: 500, error: true, message: error };
    }
  }
}
