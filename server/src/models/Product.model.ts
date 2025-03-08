import mongoose, { Schema, Document } from "mongoose";

export interface Product extends Document {
  id: number;
  name: string;
  price: number;
  store_name: string;
}

const ProductSchema: Schema = new Schema<Product>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  store_name: { type: String, required: true },
});

const ProductModel = mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;
