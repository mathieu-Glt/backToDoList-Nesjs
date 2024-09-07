import { ListTask } from "src/listTasks/entity/listTask.entity";
import { Task } from "../entity/task.entity";



class ResponseInterface {
    results?: Task | {};
    error: boolean;
    message: string;
    status: number;
}

export class ResponsesSuccessInterface extends ResponseInterface {
    results?: Task | {};

}

export class ResponsesErrorInterface extends ResponseInterface {
    error: boolean;

}
