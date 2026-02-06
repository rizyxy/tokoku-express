import { DEFAULT_LIMIT } from "../lib/const";
import { prisma } from "../lib/prisma";

const ProductRepository = {
    /**
     * Find many products
     * @param offset number
     * @returns Promise<Product[]>
     */
    async findMany({ offset }: { offset: number }) {
        return prisma.product.findMany({
            take: DEFAULT_LIMIT,
            skip: offset,
            orderBy: {
                createdAt: "desc"
            }
        });
    },

    /**
     * Find one product by id
     * @param id string
     * @returns Promise<Product | null>
     */
    async findById(id: string) {
        return prisma.product.findUnique({
            where: {
                id
            }
        });
    }
}

export default ProductRepository;