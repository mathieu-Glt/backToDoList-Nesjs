import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse =
      exception instanceof HttpException && exception.getResponse();

    const errorResponse = {
      code: statusCode,
      message: 'Error',
      error: exceptionResponse ?? (exception as any).message,
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
      data: null,
    };

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        'Exception',
      );
    } else {
      Logger.error(
        `${exception.name} ${request.method} ${request.url}`,
        JSON.stringify({ errorResponse, stack: exception.stack }),
        'Exception',
      );
    }

    return response.status(statusCode).json(errorResponse);
  }
}
