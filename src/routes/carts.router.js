import { Router } from "express";
import CartManager from "../cartManager.js";
export const cartsRouter = Router();

const cartManager = new CartManager ("src/DB/carts.json");


 cartsRouter.post("/", async (req, res)=> {
    try {
        const newCart = req.body;
        const addCart = await cartManager.addCart(newCart);
        !addCart ? res.status(200).json({status:"Success", msg:"Cart save", data:newCart}) : res.status(200).json({status:"Error", msg:addCart});
    } catch (error) {
        console.log("Error add cart", error);
    }
 })

 cartsRouter.get("/:cid", async (req, res) => {
     try {
        const id = req.params.cid
        const cartExist = await cartManager.getCartId(id)
        cartExist ? res.status(200).json({status:"Success", msg:`Cart ${id} exist`, data:cartExist}) : res.status(200).json({status:"Error", msg:`Cart ${id} does not exist`});
    } catch (error) {
        console.log("Error en /carts/id", error)
    }
})

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid
        const id = req.params.pid
        const addToCart = await cartManager.addProductsToCarts(cid,id)
        !addToCart ? res.status(200).json({status:"Success", msg:"Product add to cart", data:addToCart}) : res.status(200).json({status:"Error", msg:addToCart});
    } catch (error) {
        console.log("Error add product in cart", error); 
    }
 })
cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const deleteProd = await cartManager.removeProductFromCart(cid,pid)
        !deleteProd ? res.status(200).json({status:"Success", msg:"Product add to cart", data:deleteProd}) : res.status(200).json({status:"Error", msg:deleteProd});
    } catch (error) {
        console.log("Error delete product", error); 
    }
 })