import { AuthenticatedRequest } from "../middleware/is-authenticated.middleware";
import { Response } from "express";
import { CreateOrderSchema } from "../schema/order.schema";
import { AppError } from "../middleware/error-handler.middleware";
import OrderService from "../services/order.service";

const OrderController = {
    /**
     * Create order
     * @param req AuthenticatedRequest
     * @param res Response
     */
    async createOrder(req: AuthenticatedRequest, res: Response) {
        const request = CreateOrderSchema.safeParse(req.body);

        if (!request.success) {
            throw new AppError("Invalid request", 400);
        }

        const result = await OrderService.createOrder(request.data, req.user!.userId);

        return res.status(201).json({
            success: true,
            data: result
        });
    },

    /**
     * Find many orders by user id
     * @param req AuthenticatedRequest
     * @param res Response
     */
    async findManyOrderByUserId(req: AuthenticatedRequest, res: Response) {
        const offset = parseInt(req.query.offset as string) || 0;

        const result = await OrderService.findManyOrderByUserId(req.user!.userId, offset);

        return res.status(200).json({
            success: true,
            data: result
        });
    },

    /**
     * Find one order by id
     * @param req AuthenticatedRequest
     * @param res Response
     */
    async findOneById(req: AuthenticatedRequest, res: Response) {

        const { id } = req.params;

        const result = await OrderService.findOneById(id as string);

        if (!result) {
            throw new AppError("Order not found", 404);
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    }

}

export default OrderController;