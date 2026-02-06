import { DEFAULT_LIMIT } from "../lib/const";
import { prisma } from "../lib/prisma";
import { ResolvedCartItem } from "../services/cart.service";

const OrderRepository = {
    /**
     * Create order
     * @param userId string
     * @param cartItems ResolvedCartItem[]
     * @returns Promise<Order>
     */
    async create(userId: string, cartItems: ResolvedCartItem[]) {
        return prisma.order.create({
            data: {
                userId,
                orderDetails: {
                    create: cartItems.map((item) => ({
                        productId: item.id,
                        productName: item.name,
                        unitPrice: item.price,
                        quantity: item.quantity
                    }))
                }
            },
            include: {
                orderDetails: true
            }
        });
    },

    /**
     * Find many orders by user id
     * @param userId string
     * @param offset number
     * @returns Promise<Order[]>
     */
    async findManyByUserId(userId: string, offset: number) {
        return prisma.order.findMany({
            where: {
                userId
            },
            take: DEFAULT_LIMIT,
            skip: offset,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                invoice: true,
                orderDetails: true
            }
        });
    }
}

export default OrderRepository;