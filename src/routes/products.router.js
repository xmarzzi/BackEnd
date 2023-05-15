import { Router } from "express";
import ProductManager from "../productManager.js";
export const productsRouter = Router();
import { uploader } from "../utils.js";

const manager = new ProductManager("src/DB/products.json");

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

 productsRouter.post("/", uploader.single('file'), async (req, res) =>{
    try {
        const newProduct = req.body;
        newProduct.picture = "http://localhost:8080/" + req.file.filename;
        newProduct.thumbnails = newProduct.picture
        const add = await manager.addProduct(newProduct);
        if (!add) {
            return res.status(200).json({
                status:"Success",
                msg:"Producto agregado",
                data:newProduct
            });
        }else{
            return res.status(400).json({
                status:"Error",
                msg:add,
            });
        }
    } catch (error) {
        console.log("Error en agregar producto", error)
    }
})

productsRouter.put("/:pid", async (req, res) => {
    try {
            const id = req.params.pid;
            const modific = req.body;
            const update = await manager.updateProduct(id,modific);
            if (!update) {
                return res.status(200).json({
                    status:"Success",
                    msg:"Modified product",
                    data:modific
                });
            }else{
                return res.status(400).json({
                    status:"Error",
                    msg:update,
                });
            }
        } catch (error) {
            console.log("Error", error)
        }
        
});

productsRouter.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    const product = await manager.getProductById(id)
    if (!product) {
        return res.status(400).json({
            status:"Error",
            msg:"Product does not exist"
        });
    } else {
        await manager.deleteProduct(id)
        return res.status(200).json({
            status:"Sucess",
            msg:`The product with ID: ${id} was deleted`,
            data: product
        });
    }
})