import { User } from '../entity/user.orm-entity.ts';

export interface getTokenInterface {
  accessToken: string;
  refreshToken: string;
}
