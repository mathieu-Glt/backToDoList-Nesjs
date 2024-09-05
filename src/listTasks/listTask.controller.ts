import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateListTaskDto } from "./dto/create-listTask.dto";
import { ListTask } from "./entity/listTask.entity";
import { ListTaskService } from "./listTask.service";
import { ResponsesErrorInterface, ResponsesSuccessInterface } from "./interface/response.interface";
// import { ListTaskService } from "./listTask.service";



@Controller('list-tasks')


export class ListTaskController {
    constructor(private readonly listTaskService: ListTaskService) {}

    /**
    * ListTask Controller
    * ListTask create
    * @param  body - CreateListTaskDto
    * POST - api/list-tasks
    */
   @Post()
   async createListTask(@Body() createListTaskDto: CreateListTaskDto): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
        try {
            const listTaskCreate = await this.listTaskService.createTaskList(createListTaskDto);
            return { status: 201, error: false, message: 'List task has been created', results: listTaskCreate}


        } catch (error) {
            return { status: 500, error: true, message: error };
            
        }
   }

    /**
    * ListTask Controller
    * ListTask to get all tasks for a specific user
    * @param params -  User ID 
    * @return all list tasks
    * GET - api/list-tasks/:userId
    */
   @Get(':userId')
    async getAllListTask(@Param('userId') userId: number): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
        console.log('==================================== listTask controller ~ getAllListTask');
        try {
            const listTask = await this.listTaskService.getAllListTask(userId);
            console.log('==================================== listTask controller ~ listTask', listTask);
            return { status: 200, error: false, message: 'List tasks found', results: listTask}


        } catch (error) {
            return { status: 500, error: true, message: error };


        }
   }


    /**
    * ListTask Controller
    * ListTask to get all tasks for a specific user
    * @param params -  List task ID 
    * @return all list tasks
    * GET - api/list-tasks/v1/:id
    */
       @Get('v1/:id')
       async getOneListTask(@Param('id') id: number): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
           console.log('==================================== listTask controller ~ getAllListTask');
           try {
               const listTask = await this.listTaskService.getOneListTask(id);
               console.log('==================================== listTask controller ~ listTask', listTask);
               return { status: 200, error: false, message: 'List task found', results: listTask}
   
   
           } catch (error) {
               return { status: 500, error: true, message: error };
   
   
           }
      }

    /**
     * ListTask Controller
     * ListTask delete by ID
     * @param listTaskId - ID of the ListTask to delete
     * DELETE - api/list-tasks/:id
     */

    @Delete(':id')
    async deleteListTask(@Param('id') id:number): Promise<ResponsesSuccessInterface | ResponsesErrorInterface> {
        try {
            const deleteListTask = await this.listTaskService.deleteListTask(id)
            console.log('==================================== listTask id ~ deleteListTask', deleteListTask);

            return { status: 200, error: false, message: 'List task found', results: deleteListTask}


        } catch (error) {
            console.log('==================================== listTask error ~ deleteListTask', error);
            return { status: 500, error: true, message: error };

        }
    }
   



}