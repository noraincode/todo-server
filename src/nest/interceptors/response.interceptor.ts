import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (
          response &&
          response.hasOwnProperty('meta') &&
          response.hasOwnProperty('data')
        ) {
          return response;
        }

        return {
          meta: {
            status: context.switchToHttp().getResponse().statusCode,
            timestamp: new Date().toISOString(),
          },
          data: response,
        };
      }),
    );
  }
}
