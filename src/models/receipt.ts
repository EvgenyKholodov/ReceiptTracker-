import { ReceiptsList } from './receiptsList'

export interface MainReceipt {
    mainTotalPrice: number;
    receipts: ReceiptsList[]
}