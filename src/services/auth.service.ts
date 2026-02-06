import { RegisterRequest } from "../schema/auth.schema";
import UserRepository from "../repositories/user.repository";
import { AppError } from "../middleware/error-handler.middleware";

const AuthService = {
    async register(request: RegisterRequest) {

        // Check if user already exists
        if (await UserRepository.findByEmail(request.email)) {
            throw new AppError("User already exists", 400);
        }

        // Create user
        const user = await UserRepository.create(request.email, request.password);

        return user;
    }
}

export default AuthService;