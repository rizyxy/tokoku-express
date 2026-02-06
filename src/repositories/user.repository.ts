import { User } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

const UserRepository = {
    async create(email: string, password: string): Promise<User> {
        const user = await prisma.user.create({
            data: {
                email,
                password,
            },
        });

        return user;
    },
}

export default UserRepository;