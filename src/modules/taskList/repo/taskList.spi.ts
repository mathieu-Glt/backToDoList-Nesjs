import { TaskList } from "../entity/taskList.orm-entity";

export interface ITaskListRepo {
    save(taskList: TaskList): Promise<TaskList>,
    findByTitle(title: string, userId: number): Promise<TaskList>,
    findAll(userId: number): Promise<TaskList[]>,
    findById(id: number, userId: number): Promise<TaskList>,
    delete(id: number, userId: number): Promise<void>
    
}