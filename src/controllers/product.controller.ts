import { Request, Response } from "express";
import ProductService from "../services/product.service";
import { CreateProductSchema } from "../schema/product.schema";

const ProductController = {
    /**
     * Get all products
     * @param req 
     * @param res 
     */
    async findMany(req: Request, res: Response) {
        // Get offset from query
        // Default to 0 if not provided
        const offset = Number(req.query.offset) || 0;

        // Get products from service
        const products = await ProductService.findMany({ offset });

        // Send response
        res.json(products);
    },

    /**
     * Get one product by id
     * @param req 
     * @param res 
     */
    async findById(req: Request, res: Response) {
        // Get id from params
        const { id } = req.params;

        // Validate id
        if (typeof id !== "string" || !id) {
            throw new Error("Invalid product id");
        }

        // Get product from service
        const product = await ProductService.findById(id);

        // Send response
        res.json(product);
    },

    /**
     * Create one product
     * @param req 
     * @param res 
     */
    async create(req: Request, res: Response) {

        const request = CreateProductSchema.safeParse(req.body);

        if (!request.success) {
            throw new Error("Invalid product data");
        }

        // Create product
        const product = await ProductService.createOneProduct(request.data);

        // Send response
        res.json(product);
    }
}

export default ProductController;