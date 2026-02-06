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

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    },
}

export default UserRepository;