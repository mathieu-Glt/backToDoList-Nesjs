import { TaskList } from 'src/modules/listTasks/entity/listTask.entity.js';
import { Task } from '../entity/task.orm-entity.ts';

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
