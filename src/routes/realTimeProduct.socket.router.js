import express from "express";
import ProductManager from "../Dao/productManager.js";

export const realTimeRouter = express.Router();
const productAll = new ProductManager("./src/DB/products.json")

realTimeRouter.get("/",async (req, res) => {
   try {
       const data = await productAll.getProducts();
       return res.status(200).render("realTimeProducts", { data });
   }
   catch (err) {
       return res.status(500).json({ status: "error", msg: "Error in server", data: {} })
   }
})