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
 const socketServer = new Server(httpServer);

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

socketServer.on('connection', (socket) => {
  console.log('Se abrió un canal de socket' + socket.id);

  socket.on('client:new_product', (data) => {
      // console.log(data);
    manager.addProduct(data);
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

});

