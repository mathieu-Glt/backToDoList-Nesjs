import { Task } from "../entity/task.orm-entity";

export interface ITaskRepo {
    save(task: Task): Promise<Task>,
    update(id: number, task: Partial<Task>),
    findAll(listTaskId: number): Promise<Task[]>,
    findById(id: number): Promise<Task>,
    delete(id: number): Promise<void>,
}