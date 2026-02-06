import { Product } from "../../generated/prisma/browser";
import ProductRepository from "../repositories/product.repository";
import { CreateProductRequest } from "../schema/product.schema";

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
    },

    /**
     * Create one product
     * @param data Product
     * @returns Promise<Product>
     */
    async createOneProduct(request: CreateProductRequest): Promise<Product> {
        return ProductRepository.create(request);
    }
}

export default ProductService;