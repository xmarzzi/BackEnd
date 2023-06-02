import express from "express";
import ProductManager from "../Dao/productManager.js";
export const homeProductsHtml = express.Router();

 const productAll = new ProductManager("./src/DB/products.json")
 homeProductsHtml.get("/",  async (req, res) => {
    const data = await productAll.getProducts()
    res.status(200).render("home", {data})
    });