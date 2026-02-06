import { Request, Response } from "express";
import { RegisterSchema } from "../schema/auth.schema";
import AuthService from "../services/auth.service";

const AuthController = {
    async register(req: Request, res: Response) {
        const request = RegisterSchema.safeParse(req.body);

        if (!request.success) {
            return res.status(400).json({
                message: "Invalid request",
                error: request.error.message,
            });
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