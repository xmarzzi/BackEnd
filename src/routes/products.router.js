import { Router } from "express";
import fs from "fs";
import ProductManager from "../productManager.js";
export const routerProducts = Router()
const productManager = new ProductManager("./products.json");

let data = await fs.promises.readFile('./src/products.json');


routerProducts.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        const limit = req.query.limit;
        if(products.length===0){
            return res.status(418).json({
                status:"Error 418", 
                msg:"Product list is empty",
            })
        }else if(limit){
            const result = products.slice(0, limit);
            return res.status(200).json({
                status:"Success",
                msg:`Displaying first ${limit} Products`,
                data: result.slice(0,limit)})
        }
        else {
            res.status(200).json({
                status:"Success",
                msg:`Displaying all products`,
                data: products})
        }
    } catch (error) {
        console.log("Unkown error: ", error)
    }});



routerProducts.get("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        const product = await productManager.getProductById(id)
        if(product){
            return res.status(200).json({
                status:"Success",
                msg:`Displaying product ${id}`,
                data:product
            });
        }else{
            return res.status(400).json({
                status:"Error",
                msg:`product ${id} does not exist`
            });

        };
    } catch (error) {
       console.log("Error en /products/id", error)
    }
});

    


/*routerProducts.post("/",async (req,res) => {
    try{
        const productBody = req.body;
        await ProductManager.addProduct(productBody)

        return res.status(200).json({
            status:"Success", 
            msg:"Producto Agregado",
        });
    } catch (error) {
        console.log("Error en /products/id", error)
     }
})

routerProducts.put("/:pid",async (req,res) => {
    try{
        const id=req.params.pid;
        const productBody = req.body;
        await ProductManager.updateProduct(id,...productBody)

        return res.status(201).json({
            status:"success", 
            msg:"Producto Actualizado", 
            data: productBody,
        });
    } catch (error) {
        console.log("Error en /products/id", error)
     }
})

routerProducts.delete("/:pid", (req,res) => {
    const id=req.params.pid;
    ProductManager.deleteProduct(id)

    return res.status(201).json({
        status:"success", 
        msg:"Producto Eliminado", 
        data: productBody,
     });
})*/
