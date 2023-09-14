import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Auth = createParamDecorator((data: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  return data ? req.user && req.user[data] : req.user;
});
