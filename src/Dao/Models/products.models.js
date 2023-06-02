import { Schema, model } from "mongoose";

const schema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true},
  price: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  thumbnails: { type: Array, required: true },
  status: { type: Boolean, required: true },
});

export const productsModel = model("product", schema);