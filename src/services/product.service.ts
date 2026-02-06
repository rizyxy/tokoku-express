import { Product } from "../../generated/prisma/browser";
import ProductRepository from "../repositories/product.repository";
import { CreateProductRequest, UpdateProductRequest } from "../schema/product.schema";

const ProductService = {
    /**
     * Find many products
     * @param offset number
     * @returns Promise<Product[]>
     */
    async findManyProducts({ offset }: { offset: number }): Promise<Product[]> {
        return ProductRepository.findMany({ offset });
    },

    /**
     * Find one product by id
     * @param id string
     * @returns Promise<Product | null>
     * @throws Error if product not found
     */
    async findProductById(id: string): Promise<Product | null> {
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
    },

    /**
     * Delete one product
     * @param id string
     * @returns void
     * @throws Error if an error occurred while deleting the product
     */
    async deleteProduct(id: string) {
        try {
            await ProductRepository.deleteById(id);
        } catch (error) {
            throw new Error("An error occurred while deleting the product");
        }

    }
}

export default ProductService;