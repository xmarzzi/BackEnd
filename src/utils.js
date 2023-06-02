// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//<-----------------MULTER---------------->
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.join(__dirname, "public"));
    },
    filename: (req,file,cb) => {
        cb (null,file.originalname)
    },
});

export const uploader = multer ({storage});


//<-----------------MONGOOSE---------------->
import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://coderhouse:Mapache144152ñ@backcoder.jai0u0k.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}



//<--------------SOCKET---------------->

import { Server } from 'socket.io';
import ProductManager from "./Dao/productManager.js";
import { MsgModel } from "./Dao/Models/chat.model.js";


export function connectSocket(httpServer) {
  const io = new Server(httpServer);

  
  io.on('connection', (socket) => {
    console.log('Se abrió un canal de socket' + socket.id);
    const manager = new ProductManager("src/DB/products.json");
   
    // add product to the list
    socket.on('client:new_product', async(req,res) => {
         await manager.addProduct(req);
         io.emit("msg_back_to_sockets", req )
      });
  
    socket.on("client:deleteproduct", async (req,res) => {
      console.log(req);
      await manager.deleteProduct(req)
      const products = await manager.getProducts();
       // Emitir un evento a todos los clientes conectados con la lista de productos actualizada
       io.emit('server:updateproducts', products)
      
    })
  
    socket.on('disconnect', () => {
      console.log('User was disconnected');
    });

    //<-----------CHAT------->
    /*socket.on('msg_front_to_back', async (msg) => {
      const msgCreated = await MsgModel.create(msg);
      const msgs = await MsgModel.find({});
      socketServer.emit('msg_back_to_front', msgs);
    });*/
  
  });
}