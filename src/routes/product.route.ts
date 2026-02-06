import { Router } from "express";
import ProductController from "../controllers/product.controller";
import isAuthenticated from "../middleware/is-authenticated.middleware";
import isAdminMiddleware from "../middleware/is-admin.middleware";

const ProductRouter = Router();

ProductRouter.get("/", ProductController.findMany);
ProductRouter.get("/:id", ProductController.findById);

ProductRouter.use(isAuthenticated);
ProductRouter.use(isAdminMiddleware);

ProductRouter.post("/create", ProductController.create);

ProductRouter.put("/:id/update", ProductController.update);

export default ProductRouter;