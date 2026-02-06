import { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import AuthService from "../services/auth.service";
import { AppError } from "../middleware/error-handler.middleware";
import { AuthenticatedRequest } from "../middleware/is-authenticated.middleware";
import JwtService from "../services/jwt.service";

const AuthController = {
    async register(req: Request, res: Response) {
        const request = RegisterSchema.safeParse(req.body);

        if (!request.success) {
            throw new AppError("Invalid request", 400);
        }

        const user = await AuthService.register(request.data);

        return res.status(201).json({
            message: "User created successfully",
            data: {
                id: user.id,
                email: user.email,
            },
        });
    },

    async login(req: Request, res: Response) {
        const request = LoginSchema.safeParse(req.body);

        if (!request.success) {
            throw new AppError("Invalid request", 400);
        }

        const tokenPair = await AuthService.login(request.data);

        return res.status(200).json({
            message: "User logged in successfully",
            data: tokenPair
        });
    },

    async refreshToken(req: AuthenticatedRequest, res: Response) {
        const refreshToken = req.headers.authorization;

        if (!refreshToken) {
            throw new AppError("Refresh token is required", 400);
        }

        const tokenPair = await JwtService.refreshToken(refreshToken);

        return res.status(200).json({
            message: "Token refreshed successfully",
            data: tokenPair
        });
    }
}

export default AuthController;