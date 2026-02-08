import { Request, Response } from "express";
import XenditService from "../services/xendit.service";

const XenditController = {
    /**
 * Update invoice status
 * @param req 
 * @param res 
 */
    async handleXenditInvoiceStatusChange(req: Request, res: Response) {
        const { external_id, status } = req.body;

        const invoice = await XenditService.handleXenditInvoiceStatusChange(external_id, status);

        res.json({ invoice });
    }
};

export default XenditController;