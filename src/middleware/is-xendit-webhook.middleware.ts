import { Request, Response, NextFunction } from "express";

/**
 * Verify xendit webhook token in request header
 * @param req 
 * @param res 
 * @param next 
 */
const isXenditWebhook = (req: Request, res: Response, next: NextFunction) => {
    const callbackToken = req.header('x-callback-token');

    const expectedToken = process.env.XENDIT_WEBHOOK_VERIFICATION_TOKEN;

    if (!callbackToken || callbackToken !== expectedToken) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or missing x-callback-token.'
        });
    }

    next();
};

export default isXenditWebhook;