import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entity/task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ListTaskService } from "src/listTasks/listTask.service";
import { TaskStatus } from "./enum/stausTask.enum";
import { ListTask } from "src/listTasks/entity/listTask.entity";





@Injectable()

export class TaskService {
    constructor(
        @InjectRepository(Task) 
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(ListTask) 
        private readonly listTaskRepository: Repository<ListTask>,
        private readonly listTaskService: ListTaskService, // I inject ListTaskService

    ) {}

    /**
     * Create task
     * @param body - CreateTaskDto
     */

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        try {
            const { longDescription, shortDescription, deadline, status, listTask: listTaskId } = createTaskDto;
    
            // Convert string to date object
            const deadlineDate = new Date(deadline);
            if (isNaN(deadlineDate.getTime())) {
                throw new Error('Invalid deadline Date');
            }
    
            // Get list associate to task
            // const listTaskAssociateToTask = await this.listTaskService.getOneListTask(listTaskId);
            const listTaskAssociateToTask = await this.listTaskRepository.exists({
                where: { id: listTaskId }
            });
            // if (!listTaskAssociateToTask) {
            //     throw new NotFoundException(`Task list with ID ${listTaskId} not found`);
            // }
    
            // Create a new task
            const newTask = this.taskRepository.create({
                longDescription,
                shortDescription,
                deadline: deadlineDate,
                status: status || TaskStatus.IN_PROGRESS, // Utiliser la valeur par défaut si non fournie
                listTask: { id: listTaskId}, // Assurez-vous que ceci est une instance de ListTask
            });
    
            // Save task to database
            return await this.taskRepository.save(newTask);
        } catch (error) {
            throw new InternalServerErrorException('Failed during creation task');
        }
    }

     
    /**
     * Create task - Method to get all tasks for a specific list task
     * @param listTaskId - number
     */

    async getTasksForListTask(listTaskId: number): Promise<Task[] | {}> {
        try {
            const listTasks = await this.listTaskService.getOneListTask(listTaskId)
            console.log('listTasks', listTasks);
            
            
            if (!listTasks) {
                throw new NotFoundException(`User with ID ${listTaskId} not found`);
            }

            const tasksAssociateToListTask = await this.taskRepository.find({
                where: { listTask: listTasks },
            })

            return tasksAssociateToListTask;

        } catch (error) {
            throw new InternalServerErrorException('Failed to get all tasks associate associated with their task list');

        }
    }

     
    /**
     * Create task - Method for delete a task by its id
     * @param id - number
     */

        async deleteTask(id: number): Promise<object | InternalServerErrorException> {
            try {
                // Delete the task
                const result =  await this.taskRepository.delete(id);
    
                if(result.affected === 0) throw new NotFoundException(`List task with ID ${id} not found`)
                
                    return { message: 'List task deleted successfully' }
    
            } catch (error) {
                console.error('Error creating user:', error.message);
                throw new InternalServerErrorException('Failed to delete the task');
    
            }
    
        }

    /**
     * Update prop status of the task by retrieving its ID
     * @param id - number
     */

    async updateStatusTask(id: number, status: TaskStatus): Promise<Task> {
        console.log('task.service .ts ~ updateStatusTask id - status', id, status);

        try {
           // Find task by its ID
           const task = await this.taskRepository.findOne({ where: {id: id}});
           console.log('task.service .ts ~ updateStatusTask task', task);

           if(!task) throw new NotFoundException(` Task with ID ${id} not found`)
           // Update task status
            task.status = status;
            return await this.taskRepository.save(task);
        


        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new InternalServerErrorException('Failed to update the task');

        }
    }


    




}