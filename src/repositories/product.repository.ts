import { Product } from "../../generated/prisma/browser";
import { DEFAULT_LIMIT } from "../lib/const";
import { prisma } from "../lib/prisma";
import { CreateProductRequest } from "../schema/product.schema";

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
    },

    /**
     * Create one product
     * @param data CreateProductRequest
     * @returns Promise<Product>
     */
    async create(data: CreateProductRequest) {
        return prisma.product.create({
            data
        });
    }
}

export default ProductRepository;