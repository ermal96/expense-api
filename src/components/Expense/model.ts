import * as connections from '@/config/connection/connection';
import { Document, Schema } from 'mongoose';

/**
 * @export
 * @interface IExpenseModel
 * @extends {Document}
 */

 export type ExpensePaymentMethod = {
    type: string,
    amount: number,
  }
  
  export type ExpenseItem = {
    name: string,
    quantity: number,
    priceBeforeVat: number,
    vatRate: number,
    vatAmount: number,
    priceAfterVat: number,
  }
  
export interface IExpenseModel extends Document {
    totalPrice: number,
    dateTimeCreated: string,
    seller: {
        name: string,
        address: string,
        town: string,
        country: string
    },
    items: Array<ExpenseItem>,
    totalPriceWithoutVAT: number,
    totalVATAmount: number,
}

const ExpenseSchema: Schema = new Schema(
    {
        totalPrice: Number,
        category: String,
        dateTimeCreated: String,
        seller: {
            name: String,
            address: String,
            town: String,
            country: String
        },
        items: [{
            name: String,
            quantity: Number,
            priceBeforeVat: Number,
            vatRate: Number,
            vatAmount: Number,
            priceAfterVat: Number,
        }],
        totalPriceWithoutVAT: Number,
        totalVATAmount: Number,
    },
    {
        collection: 'expenses',
        versionKey: false,
    }
);

export default connections.db.model<IExpenseModel>('ExpenseModel', ExpenseSchema);
