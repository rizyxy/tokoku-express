import { InvoiceStatus } from "../../generated/prisma/enums";
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
    },

    /**
     * Update invoice by id
     * @param id string
     * @param status InvoiceStatus
     * @returns Promise<Invoice>
     */
    async updateById(id: string, status: InvoiceStatus) {
        return prisma.invoice.update({
            where: {
                id
            },
            data: {
                status
            }
        });
    }
}

export default InvoiceRepository;