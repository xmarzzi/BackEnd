import { Router } from "express";
import CartManager from "../cartManager.js";
export const cartsRouter = Router();

const cartManager = new CartManager ("src/carts.json");


 cartsRouter.post("/", async (req, res)=> {
    try {
        const newCart = req.body;
        const addCart = await cartManager.addCart(newCart);
        if (!addCart) {
            return res.status(200).json({
                status:"Success",
                msg:"Cart creado",
                data:newCart
            });
        } else {
            return res.status(400).json({
                status:"Error",
                msg:addCart
            })
        }
    } catch (error) {
        console.log("Error al agregar cart", error);
    }
 })

 cartsRouter.get("/:cid", async (req, res) => {
     try {
        const id = req.params.cid
        const cartExist = await cartManager.getCartId(id)
        if (cartExist) {
            return res.status(200).json({
                status:"Success",
                msg:`Cart ${id} exist`,
                data:cartExist
            })
        } else {
            return res.status(400).json({
                status:"Error",
                msg:`Cart ${id} does not exist`
            })
        }
     } catch (error) {
        console.log("Error en /carts/id", error)
     }
 })

 cartsRouter.post("/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid
        const id = req.params.pid
        const addToCart = await cartManager.addProductsToCarts(cid,id)
        res.status(200).json({
            status:"Success",
            msg:"Product add to cart",
            data: addToCart
        })
    } catch (error) {
        console.log("Error al agregar product al cart", error); 
    }
 })