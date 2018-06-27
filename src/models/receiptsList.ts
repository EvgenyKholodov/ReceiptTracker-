import { Item } from './item'

export interface ReceiptsList {
    type: string;
    expenses: Item[];
    totalPrice: number;
}