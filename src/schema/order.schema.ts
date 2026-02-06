import z from "zod";

export const CartItemSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    quantity: z.number().min(1, "Quantity is required"),
})

export type CartItemRequest = z.infer<typeof CartItemSchema>;

export const CreateOrderSchema = z.object({
    cart: z.array(CartItemSchema).min(1)
});

export type CreateOrderRequest = z.infer<typeof CreateOrderSchema>;


