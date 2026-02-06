import { Request, Response } from "express";
import { RegisterSchema } from "../schema/auth.schema";
import AuthService from "../services/auth.service";
import { AppError } from "../middleware/error-handler.middleware";

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
    }
}

export default AuthController;