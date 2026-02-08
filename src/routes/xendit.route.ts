import { Router } from "express";
import isXenditWebhook from "../middleware/is-xendit-webhook.middleware";
import XenditController from "../controllers/xendit.controller";

const XenditRouter = Router();

XenditRouter.post('/update-invoice', isXenditWebhook, XenditController.handleXenditInvoiceStatusChange);

export default XenditRouter;