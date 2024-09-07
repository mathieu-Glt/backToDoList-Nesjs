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
    catch(exception: HttpException, host: ArgumentsHost): void {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const statusCode = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
      const exceptionResponse = (exception?.getResponse() as Error | any) || null;
  
      const errorResponse = {
        code: statusCode,
        message: 'Error',
        error: exceptionResponse.message,
        method: request.method,
        path: request.url,
        timestamp: new Date().toISOString(),
        data: {},
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