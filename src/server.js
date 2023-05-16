import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import handlebars from 'express-handlebars';
import {homeProductsHtml} from "./routes/homeProducts.html.router.js";
import {realTimeRouter} from "./routes/realTimeProduct.socket.router.js";
import ProductManager from "./productManager.js";
import { __dirname } from "./utils.js";
import path from "path";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
   console.log(`Example app listening on http://localhost:${PORT}`)
 });
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// CONFIGURACIÓN DEL MOTOR DE PLANTILLAS
app.engine('handlebars', handlebars.engine());
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars");

//RUTAS: API RENDER SERVER SIDE
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// RUTAS: HTML RENDER SERVER SIDE
app.use("/", homeProductsHtml )

// RUTAS: SOCKETS
app.use('/realtimeproducts', realTimeRouter)


//CONECTANDO SOCKET
const manager = new ProductManager("src/DB/products.json");

io.on('connection', (socket) => {
  console.log('Se abrió un canal de socket' + socket.id);

  socket.on('client:new_product', async(data) => {
      //  console.log(data);
       await manager.addProduct(data);
       const products = await manager.getProducts();
       io.emit("msg_back_to_sockets", products )
    });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

});

