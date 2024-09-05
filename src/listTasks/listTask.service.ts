import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListTask } from "./entity/listTask.entity";
import { Repository } from "typeorm";
import { CreateListTaskDto } from "./dto/create-listTask.dto";
import { UserService } from "src/user/user.service";


Injectable()
export class ListTaskService {
    constructor(
        @InjectRepository(ListTask)
        private readonly listTaskRepository: Repository<ListTask>,
        private readonly userService: UserService // I inject UserService
    ) {}


    /**
     * Create a list of task  
     * @param body - CreateListTaskDto
     */

    async createTaskList(createListTaskDto: CreateListTaskDto): Promise<ListTask | InternalServerErrorException > {

        try {
            const { title } = createListTaskDto;
            const user = await this.userService.findUser(createListTaskDto.user)
            console.log('==================================== listTask service ~ createTaskList');
            console.log(user);
            console.log('====================================');
    

            const listTask = this.listTaskRepository.create({ title, user })
            return  this.listTaskRepository.save(listTask);
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new InternalServerErrorException('Failed to create List task');

        }
    }

// Method to get all tasks for a specific user
    async getAllListTask(userId: number): Promise<ListTask[] | InternalServerErrorException> {
        try {

            const user = await this.userService.findUser(userId)

            if (!user) {
                throw new NotFoundException(`User with ID ${userId} not found`);
            }


            // Fetch tasks associated with the user
            return await this.listTaskRepository.find({
            where: { user: { id: userId } },
            relations: ['user'], // Include related user if needed
            });  

        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new InternalServerErrorException('Failed to get all list tasks');

        }
    }

    // Method to get all tasks for a specific user
    async getOneListTask(id: number): Promise<ListTask | InternalServerErrorException> {
        try {

            // Fetch tasks associated with the user
            return await this.listTaskRepository.findOne({
                where: { id },
            });  

        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new InternalServerErrorException('Failed to get all list tasks');

        }
    }

    // Method for delete a list task by its id
    async deleteListTask(id: number): Promise<object | InternalServerErrorException> {
        try {
            // Delete the task
            console.log('==================================== listTask service ~ deleteListTask');
            console.log(id);
            console.log('====================================');
            const result =  await this.listTaskRepository.delete(id);

            if(result.affected === 0) throw new NotFoundException(`List task with ID ${id} not found`)
            
                return { message: 'List task deleted successfully' }

        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new InternalServerErrorException('Failed to delete the list task');

        }

    }


}