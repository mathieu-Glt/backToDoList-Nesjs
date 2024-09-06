import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url, ip, headers } = request;

    const startTime = Date.now();
    const controllerMethod = context.getHandler().name;
    const controllerName = context.getClass().name;
    const shortenedUrl = new URL(url, 'http://dummy').pathname;

    return next.handle().pipe(
      tap(() => {
        const status = response.statusCode;
        const responseTime = Date.now() - startTime;

        const logMessage = `Method: ${method} | Status: ${status} | URL: ${shortenedUrl} | Response time: ${responseTime}ms | IP: ${ip} | User-Agent: ${headers['user-agent']}`;

        this.logger.log(logMessage, `${controllerName} - ${controllerMethod}`);
      }),
    );
  }
}
