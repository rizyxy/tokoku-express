import { User } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

const UserRepository = {
    /**
     * Create a new user
     * @param email User email
     * @param hashedPassword User hashed password
     * @returns User object
     */
    async create(email: string, hashedPassword: string): Promise<User> {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return user;
    },

    /**
     * Find user by email
     * @param email User email
     * @returns User object or null
     */
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