import { Product } from "../../generated/prisma/browser";
import ProductRepository from "../repositories/product.repository";
import { CreateProductRequest, UpdateProductRequest } from "../schema/product.schema";

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
    },

    /**
     * Update one product
     * @param id string
     * @param data UpdateProductRequest
     * @returns Promise<Product>
     * @throws Error if product not found
     */
    async updateProduct(id: string, data: UpdateProductRequest): Promise<Product> {
        const product = await ProductRepository.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return ProductRepository.update(id, data);
    }
}

export default ProductService;