import { z } from "zod";

export const CreateProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.number().min(1, "Price is required"),
});

export type CreateProductRequest = z.infer<typeof CreateProductSchema>;