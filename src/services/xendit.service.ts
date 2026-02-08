import xendit from "../lib/xendit";

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
}

export default XenditService;