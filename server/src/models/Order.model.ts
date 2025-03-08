import mongoose, { Schema, Document } from "mongoose";

// Define the ProductOrder schema
interface ProductOrder {
  product_id: number;
  amount: number;
}

// Extend Document to ensure Mongoose compatibility
export interface OrderDocument extends Document {
  customer_id: number;
  products: ProductOrder[];
  purchase_date: string;
  purchase_id: string;
}

const OrderSchema = new Schema<OrderDocument>({
  customer_id: { type: Number, required: true },
  products: [
    {
      product_id: { type: Number, required: true },
      amount: { type: Number, required: true },
    },
  ],
  purchase_date: { type: String, required: true },
  purchase_id: { type: String, required: true, unique: true },
});

const OrderModel = mongoose.model<OrderDocument>("Order", OrderSchema);
export default OrderModel;
