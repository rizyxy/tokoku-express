import InvoiceRepository from "../repositories/invoice.repository";
import OrderRepository from "../repositories/order.repository";
import { CreateOrderRequest } from "../schema/order.schema";
import CartService from "./cart.service";

const OrderService = {
    /**
     * Create order
     * @param request CreateOrderRequest
     * @param userId string
     * @returns Promise<{
     *  order: Order;
     *  invoice: Invoice;
     * }>
     */
    async createOrder(request: CreateOrderRequest, userId: string) {
        const { cart } = request;

        // Resolve Cart
        const { resolvedCart, amount } = await CartService.processCart(cart);

        // Create Order
        const order = await OrderRepository.create(userId, resolvedCart);

        // Create Invoice
        const invoice = await InvoiceRepository.create(order.id, amount);

        return {
            order,
            invoice
        };
    },

    /**
     * Find many orders by user id
     * @param userId string
     * @param offset number
     * @returns Promise<Order[]>
     */
    async findManyOrderByUserId(userId: string, offset: number) {
        return OrderRepository.findManyByUserId(userId, offset);
    }

}

export default OrderService;
