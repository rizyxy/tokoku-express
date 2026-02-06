import { Router } from "express";
import OrderController from "../controllers/order.controller";
import isAuthenticated from "../middleware/is-authenticated.middleware";

const OrderRouter = Router();

OrderRouter.use(isAuthenticated);

OrderRouter.post("/create", OrderController.createOrder);

export default OrderRouter;