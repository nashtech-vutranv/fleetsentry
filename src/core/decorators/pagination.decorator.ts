import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * @author vungpv93@gmail.com
 * @interface IPaginateReq
 */
export interface IPaginateReq {
  page: number;
  size: number;
}

/**
 * @author vungpv93@gmail.com
 * @class Pagination
 */
export const Pagination = createParamDecorator((data: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  const pagination: IPaginateReq = { page: 1, size: 10 };

  pagination.page = Number(req.query.page) || 1;
  pagination.size = Math.min(Number(req.query.size) || 10, 100);

  return pagination;
});
