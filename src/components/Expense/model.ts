import * as connections from '@/config/connection/connection';
import { Document, Schema } from 'mongoose';

/**
 * @export
 * @interface IExpenseModel
 * @extends {Document}
 */
export interface IExpenseModel extends Document {
    storeName: string;
    city: string;
    address: string;
    timestamp: string;
    category: string;
    totalPrice: number;
    items: Array<{
        productName: string;
        quantity: number;
        priceBeforeVat: number;
        vatRate: number;
        vatAmount: number;
        priceAfterVat: number;
    }>
   
}
const ExpenseSchema: Schema = new Schema(
    {
        storeName: String,
        city: String,
        address: String,
        timestamp: String,
        category: String,
        totalPrice: Number,
        items: [{
            productName: String,
            quantity: Number,
            priceBeforeVat: Number,
            vatRate: Number,
            vatAmount: Number,
            priceAfterVat: Number,
        }]
        
    },
    {
        collection: 'expenses',
        versionKey: false,
    }
);

export default connections.db.model<IExpenseModel>('ExpenseModel', ExpenseSchema);
