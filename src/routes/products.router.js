import { Router } from "express";
import ProductManager from "../productManager.js";
export const productsRouter = Router();
const manager = new ProductManager("./src/products.json");


productsRouter.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts()
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

// productsRouter.get("/", async (req, res) => {
//     const products = await manager.getProducts();
//     const limit = req.query.limit;
//     if(limit){
//         const limits = parseInt(limit);
//         const result = products.slice(0,limits);
//         res.send(result);
//     }else res.send(products);
// })


productsRouter.get("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        const product = await manager.getProductById(id)
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

productsRouter.post("/", async (req, res) =>{
    try {
        const newProduct = req.body;
        await manager.addProduct(newProduct);
        return res.status(200).json({
            status:"Success",
            msg:"Producto agregado",
            data:newProduct
        });
    } catch (error) {
        console.log("Error en agregar producto", error)
    }
})

productsRouter.put("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        const modificated = req.body;
        await manager.updateProduct(id,modificated)
        return res.status(200).json({
            status:"Success",
            msg:"Producto modificado",
            data:modificated
        });
    } catch (error) {
        console.log("Error al modificar el producto", error)
    }
})
