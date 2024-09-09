import { TaskList } from "../entity/listTask.entity";

TaskList
class ResponseInterface {
  results?: TaskList | {};
  error: boolean;
  message: string;
  status: number;
}

export class ResponsesSuccessInterface extends ResponseInterface {
  results?: TaskList | {};
}

export class ResponsesErrorInterface extends ResponseInterface {
  error: boolean;
}
