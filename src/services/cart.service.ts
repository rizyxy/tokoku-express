import { Product } from "../../generated/prisma/browser";
import ProductRepository from "../repositories/product.repository";
import { CartItemRequest } from "../schema/order.schema";

export interface ResolvedCartItem extends Product {
    quantity: number;
}

const CartService = {

    /**
     * Process cart items
     * @param cart CartItemRequest[]
     * @returns Promise<{
     *  resolvedCart: ResolvedCartItem[];
     *  amount: number;
     * }>
     */
    async processCart(cart: CartItemRequest[]): Promise<{
        resolvedCart: ResolvedCartItem[];
        amount: number;
    }> {
        const resolvedCart = await this.resolveCart(cart);
        const amount = await this.calculateCart(resolvedCart);

        return {
            resolvedCart,
            amount
        };
    },

    /**
     * Resolve cart items
     * @param cart CartItemRequest[]
     * @returns Promise<ResolvedCartItem[]>
     */
    async resolveCart(cart: CartItemRequest[]): Promise<ResolvedCartItem[]> {
        const productIds = cart.map((item) => item.productId);

        const products = await ProductRepository.findByIds(productIds);

        return products.map((product) => ({
            ...product,
            quantity: cart.find((item) => item.productId === product.id)?.quantity!,
        }));
    },

    /**
     * Calculate cart total
     * @param resolvedCart ResolvedCartItem[]
     * @returns Promise<number>
     */
    async calculateCart(resolvedCart: ResolvedCartItem[]) {
        const amount = resolvedCart.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        return amount;
    }
}

export default CartService;