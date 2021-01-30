import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

/**
 *
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFunction}
 * This middleware assumes that the middleware currentUser has been
 * executed before, hence the currentUser property on req is populated.
 * If not so, it throws an error of type NotAuthorizedError.
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new NotAuthorizedError();
  next();
};
