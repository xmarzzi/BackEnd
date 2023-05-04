import express from "express";
import {routerProducts} from './routes/products.router.js'

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", routerProducts);
// app.use('/api/carts', routerCarts)

const server = app.listen(port, () => {

    console.log(`Server in http://localhost:${port}`)
    
    })
    
    server.on("error", (err) => {
    
    console.error(`Error: ${err}`)
    
    })

