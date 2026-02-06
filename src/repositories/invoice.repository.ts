import { prisma } from "../lib/prisma";

const InvoiceRepository = {
    /**
     * Create invoice
     * @param orderId string
     * @param amount number
     * @returns Promise<Invoice>
     */
    async create(orderId: string, amount: number) {
        return prisma.invoice.create({
            data: {
                orderId,
                amount
            }
        });
    }
}

export default InvoiceRepository;