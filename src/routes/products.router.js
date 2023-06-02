import { Router } from "express";
import ProductManager from "../Dao/productManager.js";
export const productsRouter = Router();
import { productsModel } from "../Dao/Models/products.models.js";
import { productServices } from "../services/product.services.js";
import { uploader } from "../utils.js";

const manager = new ProductManager("./src/DB/products.json");
const services = new productServices();

productsRouter.get('/', async (req, res) => {
    try {
        const products = await services.getAll();
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

        
    } catch (error) {
       console.log("Error en /products/id", error)
    }
});

 productsRouter.post("/",  async (req, res) =>{
    try {
        const {title,description,code,price,stock,category,thumbnails} = req.body;
        const userCreated = await services.postProduct({title,description,code,price,stock,category,thumbnails, status:true})
        return res.status(201).json({
            status: 'success',
            msg: 'user created',
            data: userCreated,
          });
    } catch (error) {
        console.log("Error en agregar producto", error)
    }
})

productsRouter.put("/:pid", async (req, res) => {
    try {
            const id = req.params.pid;
            const modific = req.body;
            await services.updateProduct(id,modific)
            
        } catch (error) {
            console.log("Error", error)
        }
        
});

productsRouter.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    await services.deletedProduct(id)
    
})