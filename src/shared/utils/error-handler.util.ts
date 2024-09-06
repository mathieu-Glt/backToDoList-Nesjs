import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const handleError = (error: unknown): never => {
  if (error instanceof HttpException) throw error;
  if (error instanceof Error)
    throw new InternalServerErrorException(error.message);
  throw new InternalServerErrorException(error.toString());
};
