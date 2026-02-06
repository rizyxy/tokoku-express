import { NextFunction, Request, Response } from "express";
import { AppError } from "./error-handler.middleware";
import JwtService from "../services/jwt.service";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload
}

const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Unauthorized", 401);
    }

    const decodedToken = JwtService.verifyToken(authHeader);

    req.user = decodedToken as JwtPayload;

    next();
}

export default isAuthenticated;