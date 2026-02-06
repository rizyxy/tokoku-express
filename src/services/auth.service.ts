import { LoginRequest, RegisterRequest } from "../schema/auth.schema";
import UserRepository from "../repositories/user.repository";
import { AppError } from "../middleware/error-handler.middleware";
import bcrypt from "bcrypt"
import JwtService from "./jwt.service";

const AuthService = {
    async register(request: RegisterRequest) {

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

    async login(request: LoginRequest) {
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
        const tokenPair = JwtService.issueTokenPair(user.id);

        return tokenPair;
    },
}

export default AuthService;