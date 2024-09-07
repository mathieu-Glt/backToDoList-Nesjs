import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ResponsesErrorInterface, ResponsesSuccessInterface } from "./interface/response.interface";
import { Task } from "./entity/task.entity";
import { TaskStatus } from "./enum/stausTask.enum";
CreateTaskDto




@Controller('tasks')

export class TaskController {
    constructor(private readonly taskService: TaskService) {}


    /**
    * Task Controller - Handles operations related to Task  management.
    * Endpoint to create a new Task
    * POST - api/tasks
    * 
    * @summary Creates a new task
    * 
    * @param  {CreateTaskDto} body - The data transfer object containing the details of the task to be created.
    * 
    * @returns {Promise<ResponsesSuccessInterface | ResponsesErrorInterface>} - A promise that resolves to either:
    *  - Success: An object containing the status (201), a success message, and the created task details.
    *  - Error: An object containing the status (500), an error message, and error details if something goes wrong.
    * 
    * @throws {500 Internal Server Error } - If there is any issue during the task creation process.
    */
   
   @Post()
   async create(@Body() createTaskDto: CreateTaskDto): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {

        try {
            const taskCreate = await this.taskService.createTask(createTaskDto);
            return { status: 201, error: false, message: 'Task created successfully', results: taskCreate }
    
        } catch (error) {
            return { status: 500, error: true, message: error };
        
        }
   }



    /**
    * Task Controller - Handles operations related to retrieving tasks.
    * Endpoint to retrieve all tasks associated with a specific list.
    * GET - api/tasks/:listTaskId
    * @summary Retrieves all tasks for a given list. 
    * @param {number} listTaskId - The ID of the list whose tasks are being requested.
    * @returns {Promise<{status: number, error: boolean, message: string, results?: Task[]}>} - A promise that resolves to either:
    *    - Success: An object containing the status (200), a success message, and the tasks associated with the list.
    *    - Error: An object containing the status (500), an error message, and error details if something goes wrong.
    * @throws {500 Internal Server Error} - If there is any issue during the retrieval process.
    * @throws {404 Not Found} - If no tasks are found for the provided listTaskId.
    */

   @Get(':listTaskId')
   async getAllTasks(@Param('listTaskId') listTaskId: number): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
        try {
            const getAllTasks = await this.taskService.getTasksForListTask(listTaskId)
            console.log('getAllTasks', getAllTasks);
            return { status: 200, error: false, message: 'List tasks found', results: getAllTasks}

        
        } catch (error) {
            return { status: 500, error: true, message: error };

        }
   }




    /**
    * Task Controller - Handles operations related to updating  prop status from task.
    * Endpoint to update the prop status of task by its ID.
    * PATCH - api/tasks/:id/status
    * @summary Updates a prop status from task  by ID.
    * @param {number} id - The ID of the task  to be updated.
    * @returns {Promise<ResponsesSuccessInterface | ResponsesErrorInterface>} - A promise that resolves to either:
    *    - Success: An object containing the status (200), a success message, and details of the deleted task .
    *    - Error: An object containing the status (500), an error message, and error details if something goes wrong.
    * @throws {500 Internal Server Error} - If there is any issue during the updation process.
    * @throws {404 Not Found} - If the task  with the given ID is not found
    */

    @Patch(':id/status')
    async updateTaskStatus(@Param('id') id: number, @Body('status') status: TaskStatus): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
        console.log('task.controller .ts ~ updateStatusTask id - status', id, status);

        try {
            const updateStatusTask = await this.taskService.updateStatusTask(id, status)
            console.log('task.controller .ts ~ updateStatusTask updateStatusTask', updateStatusTask);

            return { status: 200, error: false, message: 'Status tasks has been updated', results: updateStatusTask}



        } catch (error) {
            return { status: 500, error: true, message: error };

        }

    }













    /**
    * Task Controller - Handles task deletion operations.
    * Endpoint to delete a specific task by its ID.
    * DELETE - api/tasks/:taskId
    * @summary Deletes a task by ID.
    * @param {number} id - The ID of the task to be deleted.
    * @returns {Promise<ResponsesSuccessInterface | ResponsesErrorInterface>} - A promise that resolves to either:
    *   - Success: An object containing the status (200), a success message, and details of the deleted task list.
    *   - Error: An object containing the status (500), an error message, and error details if something goes wrong.
    * @throws {500 Internal Server Error} - If there is any issue during the deletion process.
    * @throws {404 Not Found} - If the task list with the given ID is not found.
    */

    @Delete(':id')
    async deleteTask(@Param('id') id:number): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
        try {
            const deleteTask = await this.taskService.deleteTask(id)
            console.log('==================================== listTask id ~ deleteTask', deleteTask);

            return { status: 200, error: false, message: 'List task found', results: deleteTask}


        } catch (error) {
            console.log('==================================== listTask error ~ deleteTask', error);
            return { status: 500, error: true, message: error };

        }
    }

}