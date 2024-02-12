import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Extracting the status and response directly
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal Server Error' };

    // If it's a validation error, extract the first message, else keep the error response intact
    const message =
      status === HttpStatus.BAD_REQUEST &&
      Array.isArray((errorResponse as any).message)
        ? (errorResponse as any).message[0]
        : (errorResponse as any).message;
    Logger.log('HttpStatus', status);
    const error = status <= 500 ? HttpStatus[status] : 'Internal Server Error';

    // Send the standardized response
    response.status(status).json({
      statusCode: status,
      status: false,
      message,
      error,
    });
  }
}
