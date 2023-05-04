import express from "express";
import fs from "fs";
const port = 8081
const app = express()

import ProductManager from './productManager.js'//Importo la clase ProductManager
const productManager = new ProductManager("./products.json"); //Creo la instancia

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

let data = await fs.promises.readFile('./products.json');
// let merch = JSON.parse(data);
//console.log(merch);
       
// serverStart()

// async function serverStart() {
   
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`);
    })
        

    // En los endpoint utilizo los metodos de ProductManager Como trabajamos con promesas le agregamos adyn await 
    app.get('/products', async (req, res) => {
       try {
           let merch = await productManager.getProducts()   
        const limit = req.query.limit;
        if(limit){
            const result = merch.slice(0, limit);
                return res.json(result);
            }
            else {
                console.log(merch)
                return res.json(merch);
            }
   
       } catch (error) {
        console.log("Error en /products", error)
      }});
    
    app.get( '/products/:pid', async (req, res) => {
        try {
             let merch = await productManager.getProducts()
        const id = req.params.pid;
        const product = merch.find((item) => item.id == id);
        if(product){
            return res.json(product);
        }else{
            return res.json("Product not found");

        };
        } catch (error) {
            console.log("Error en /products/id", error)
        }
       
    
    });
    
// }


    
 