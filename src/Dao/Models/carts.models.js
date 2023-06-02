import { Schema, model } from "mongoose";

const schema = new Schema ({
    products: [ {idProduct: {type: String}, quantity: {type: Number}}]
});

export const cartsModel = model("cart", schema);