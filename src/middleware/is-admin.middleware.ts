import { NextFunction, Request, Response } from "express";
import { AppError } from "./error-handler.middleware";
import { Role } from "../../generated/prisma/enums";
import { AuthenticatedRequest } from "./is-authenticated.middleware";

const isAdminMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== Role.ADMIN) {
        throw new AppError("Unauthorized: You are not an admin", 401);
    }
    next();
}

export default isAdminMiddleware;