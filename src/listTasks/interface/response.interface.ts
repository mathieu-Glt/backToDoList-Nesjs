import { ListTask } from "../entity/listTask.entity";


class ResponseInterface {
    results?: ListTask | {};
    error: boolean;
    message: string;
    status: number;
}

export class ResponsesSuccessInterface extends ResponseInterface {
    results?: ListTask | {};

}

export class ResponsesErrorInterface extends ResponseInterface {
    error: boolean;

}
