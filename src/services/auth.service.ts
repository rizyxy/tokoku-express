import { RegisterRequest } from "../schema/auth.schema";
import UserRepository from "../repositories/user.repository";
import { AppError } from "../middleware/error-handler.middleware";
import bcrypt from "bcrypt"

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
    }
}

export default AuthService;