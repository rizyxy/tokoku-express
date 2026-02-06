import { Router } from "express";
import ProductController from "../controllers/product.controller";

const ProductRouter = Router();

ProductRouter.get("/", ProductController.findMany);
ProductRouter.get("/:id", ProductController.findById);

export default ProductRouter;