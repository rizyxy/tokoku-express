import z from "zod";

export const RegisterSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export type RegisterRequest = z.infer<typeof RegisterSchema>;

