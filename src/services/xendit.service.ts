import { InvoiceStatus as XenditInvoiceStatus } from "xendit-node/invoice/models";
import xendit from "../lib/xendit";
import { InvoiceStatus } from "../../generated/prisma/enums";
import { AppError } from "../middleware/error-handler.middleware";
import InvoiceRepository from "../repositories/invoice.repository";

const XenditService = {
    /**
     * Create an invoice
     * @param externalId External ID - Invoice ID
     * @param amount Amount
     * @returns Invoice
     */
    async createXenditInvoice(externalId: string, amount: number) {
        const invoice = await xendit.Invoice.createInvoice({
            data: {
                externalId,
                amount,
                currency: "IDR"
            }
        });

        return invoice;
    },

    /**
     * Handle Xendit invoice status change
     * @param externalId External ID - Invoice ID
     * @param status Xendit Invoice Status
     * @returns Invoice
     */
    async handleXenditInvoiceStatusChange(externalId: string, status: XenditInvoiceStatus) {
        const localInvoiceStatus = this.convertXenditInvoiceStatusToLocalInvoiceStatus(status)

        const invoice = await InvoiceRepository.updateById(externalId, localInvoiceStatus);

        return invoice;
    },

    /**
     * Convert Xendit invoice status to local invoice status
     * @param status Xendit Invoice Status
     * @returns Invoice Status
     */
    convertXenditInvoiceStatusToLocalInvoiceStatus(status: XenditInvoiceStatus) {
        switch (status) {
            case XenditInvoiceStatus.Pending:
                return InvoiceStatus.PENDING;
            case XenditInvoiceStatus.Paid:
                return InvoiceStatus.PAID;
            case XenditInvoiceStatus.Expired:
                return InvoiceStatus.EXPIRED;
            case XenditInvoiceStatus.Settled:
                return InvoiceStatus.PAID;
            case XenditInvoiceStatus.XenditEnumDefaultFallback:
                throw new AppError("Xendit invoice status is not supported", 500);
            default:
                return InvoiceStatus.PENDING;
        }
    }
}

export default XenditService;