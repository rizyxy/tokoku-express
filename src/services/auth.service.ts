import { LoginRequest, RegisterRequest } from "../schema/auth.schema";
import UserRepository from "../repositories/user.repository";
import { AppError } from "../middleware/error-handler.middleware";
import bcrypt from "bcrypt"
import JwtService from "./jwt.service";
import { User } from "../../generated/prisma/browser";

const AuthService = {
    /**
     * Register a new user
     * @param request Register request
     * @returns User object
     */
    async register(request: RegisterRequest): Promise<User> {

        // Check if user already exists
        if (await UserRepository.findByEmail(request.email)) {
            throw new AppError("User already exists", 400);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(request.password, 10);

        // Create user
        const user = await UserRepository.create(request.email, hashedPassword);

        return user;
    },

    /**
     * Login a user
     * @param request Login request
     * @returns Access and Refresh Token
     */
    async login(request: LoginRequest): Promise<{ accessToken: string; refreshToken: string }> {
        // Check if user exists
        const user = await UserRepository.findByEmail(request.email);
        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(request.password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401);
        }

        // Issue Access and Refresh Token
        const tokenPair = JwtService.issueTokenPair(user.id, user.role);


        return tokenPair;
    },
}

export default AuthService;