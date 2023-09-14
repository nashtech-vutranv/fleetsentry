import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  NotFoundException,
  UnprocessableEntityException,
  UnauthorizedException,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { ErrorCode } from "../../enums";
import { AppException } from "./app.exception";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (exception instanceof NotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: ErrorCode.E999404,
        message: "The system has error.",
        errors: exception.message,
      });
    }

    if (exception instanceof UnprocessableEntityException) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(exception.getResponse());
    }

    if (exception instanceof UnauthorizedException) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        code: ErrorCode.E999401,
        message: "Unauthorized",
      });
    }

    if (exception instanceof AppException) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: exception.getResponse(),
        message: "BAD_REQUEST",
      });
    }

    console.log("Handle allException", exception);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: ErrorCode.E999999,
      message: "The system has error.",
      errors: exception.error,
    });
  }
}
