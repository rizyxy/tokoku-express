import { Product } from "../../generated/prisma/browser";
import ProductRepository from "../repositories/product.repository";

const ProductService = {
    /**
     * Find many products
     * @param offset number
     * @returns Promise<Product[]>
     */
    async findMany({ offset }: { offset: number }): Promise<Product[]> {
        return ProductRepository.findMany({ offset });
    },

    /**
     * Find one product by id
     * @param id string
     * @returns Promise<Product | null>
     * @throws Error if product not found
     */
    async findById(id: string): Promise<Product | null> {
        const product = await ProductRepository.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }
}

export default ProductService;