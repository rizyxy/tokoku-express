import { RegisterRequest } from "../schema/auth.schema";
import UserRepository from "../repositories/user.repository";

const AuthService = {
    async register(request: RegisterRequest) {

        const user = await UserRepository.create(request.email, request.password);

        return user;
    }
}

export default AuthService;