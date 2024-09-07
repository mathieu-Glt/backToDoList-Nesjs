import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest() as Request;
      const { method, url } = request;
  
      const startTime = Date.now();
      const controllerMethod = context.getHandler().name;
      const controllerName = context.getClass().name;
      const shortenedUrl = new URL(url, 'http://dummy').pathname;
  
      return next.handle().pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse();
          const status = response.statusCode;
          const responseTime = Date.now() - startTime;
  
          const logMessage = `Method: ${method} | Status: ${status} | URL: ${shortenedUrl} | Response time: ${responseTime}ms`;
  
          Logger.log(logMessage, `${controllerName} - ${controllerMethod}`);
        }),
      );
    }
  }