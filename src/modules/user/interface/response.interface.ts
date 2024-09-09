import { User } from '../entity/user.orm-entity.ts';
import { getTokenInterface } from './token.interface';

class ResponseInterface {
  results?: User | {};
  error: boolean;
  message: string;
  status: number;
}

export class ResponsesSuccessInterface extends ResponseInterface {
  results?: User | {};
}

export class ResponsesErrorInterface extends ResponseInterface {
  error: boolean;
}

export class signInResponseInterface {
  user: User;
  tokens: getTokenInterface;
}
