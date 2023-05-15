import express from "express";
import ProductManager from "../productManager.js";
import { uploader } from "../utils.js";


export const realTimeRouter = express.Router();
const productAll = new ProductManager("src/DB/products.json")

 realTimeRouter.get("/",  async (req, res) => {
    const data = await productAll.getProducts()
    res.status(200).render("realTimeProducts", {data})
    });

// realTimeRouter.post("/", async (req,res) => {
    
// })
(
realTimeRouter.post("/", (req,res) => {
    res.redirect('/api/products');
}))
