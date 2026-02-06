import { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import AuthService from "../services/auth.service";
import { AppError } from "../middleware/error-handler.middleware";
import JwtService from "../services/jwt.service";

const AuthController = {
    /**
     * Register a new user
     * @param req Request object
     * @param res Response object
     */
    async register(req: Request, res: Response) {
        // Validate request
        const request = RegisterSchema.safeParse(req.body);

        // Check if request is valid
        if (!request.success) {
            throw new AppError("Invalid request", 400);
        }

        // Register user
        const user = await AuthService.register(request.data);

        // Return response
        return res.status(201).json({
            message: "User created successfully",
            data: {
                id: user.id,
                email: user.email,
            },
        });
    },

    /**
     * Login a user
     * @param req Request object
     * @param res Response object
     */
    async login(req: Request, res: Response) {
        // Validate request
        const request = LoginSchema.safeParse(req.body);

        // Check if request is valid
        if (!request.success) {
            throw new AppError("Invalid request", 400);
        }

        // Login user
        const tokenPair = await AuthService.login(request.data);

        // Return response
        return res.status(200).json({
            message: "User logged in successfully",
            data: tokenPair
        });
    },

    /**
     * Refresh access token
     * @param req Request object
     * @param res Response object
     */
    async refreshToken(req: Request, res: Response) {
        // Get refresh token from header
        const refreshToken = req.headers.authorization;

        // Check if refresh token is provided
        if (!refreshToken) {
            throw new AppError("Refresh token is required", 400);
        }

        // Refresh token
        const tokenPair = JwtService.refreshToken(refreshToken);

        // Return response
        return res.status(200).json({
            message: "Token refreshed successfully",
            data: tokenPair
        });
    }
}

export default AuthController;