// import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { ListTask } from "./entity/listTask.entity";
// import { Repository } from "typeorm";
// import { CreateListTaskDto } from "./dto/create-listTask.dto";
// import { UserService } from "src/user/user.service";


// Injectable()
// export class ListTaskService {
//     constructor(
//         @InjectRepository(ListTask)
//         private readonly listTaskRepository: Repository<ListTask>,
//         private readonly userService: UserService // I inject UserService
//     ) {}


//     /**
//      * Create a list of task  
//      * @param body - CreateListTaskDto
//      */

//     async createTaskList(createListTaskDto: CreateListTaskDto): Promise<ListTask | InternalServerErrorException > {

//         try {
//             const { title } = createListTaskDto;
//             // Recover user method from module user
//             const user = await this.userService.findUser(createListTaskDto.user)

//             if(!user) throw new InternalServerErrorException('User not found')


            
//             const existingTas = await this.listTaskRepository.findOne({ where: { title, user: user } });

//             if (existingTas) {
//                 throw new ConflictException(`Task with title "${title}" already exists for this user.`);
//             }


//             // Checking that the task is not the same
//             const existingTask  = await this.listTaskRepository.findOne({ where: { title, user } });

//             if(existingTask) throw new ConflictException(`List task with title ${title} already exists`)

//             // Create the new task
//             const listTask = this.listTaskRepository.create({ title, user })
//             return  this.listTaskRepository.save(listTask);

//         } catch (error) {

//             // if (error instanceof ConflictException) {

//             //     throw error;
//             // }

//             //     // Re-throw specific exceptions without modifying them
//             //     throw error;
//             // }

//             throw new InternalServerErrorException('Failed to create List task');

//         }
//     }

 
//     /**
//      * Method to get all tasks for a specific user  
//      * @param userId - number
//      */

//     async getAllListTask(userId: number): Promise<ListTask[] | InternalServerErrorException> {
//         try {

//             const user = await this.userService.findUser(userId)

//             if (!user) {
//                 throw new NotFoundException(`User with ID ${userId} not found`);
//             }


//             // Fetch tasks associated with the user
//             return await this.listTaskRepository.find({
//             where: { user: { id: userId } },
//             relations: ['user'], // Include related user if needed
//             });  

//         } catch (error) {
//             console.error('Error creating user:', error.message);
//             throw new InternalServerErrorException('Failed to get all list tasks');

//         }
//     }

//     /**
//      * Method to get a list task  
//      * @param id - number
//      */
//     async getOneListTask(id: number): Promise<ListTask> {
//         try {

//             // Fetch tasks associated with the user
//             return await this.listTaskRepository.findOne({
//                 where: { id },
//             });  

//         } catch (error) {
//             console.error('Error creating user:', error.message);
//             throw new InternalServerErrorException('Failed to get all list tasks');

//         }
//     }

     
//     /**
//      * Method for delete a list task by its id 
//      * @param id - number
//      */

//     async deleteListTask(id: number): Promise<object | InternalServerErrorException> {
//         try {
//             // Delete the task
//             console.log('==================================== listTask service ~ deleteListTask');
//             console.log(id);
//             console.log('====================================');
//             const result =  await this.listTaskRepository.delete(id);

//             if(result.affected === 0) throw new NotFoundException(`List task with ID ${id} not found`)
            
//                 return { message: 'List task deleted successfully' }

//         } catch (error) {
//             console.error('Error creating user:', error.message);
//             throw new InternalServerErrorException('Failed to delete the list task');

//         }

//     }


// }

// function getAllListTask(userId: any, number: any) {
//     throw new Error("Function not implemented.");
// }
