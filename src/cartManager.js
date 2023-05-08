import fs from "fs";
import ProductManager from "./productManager.js";
import uuid4 from "uuid4";

const productAll = new ProductManager("src/DB/products.json")


if (!fs.existsSync ("src/DB/carts.json")){
    fs.writeFileSync("src/DB/carts.json", "[]")
};
export default class CartManager{
    constructor(path) {
        this.carts = [];
        this.path = path
    }
    async loadCarts(){
        try {
            this.carts = JSON.parse(fs.readFileSync(this.path))
        } catch (error) {
            console.log("Error carts loaded",error)
        }
    }

    async updateCarts(){
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
        } catch (error) {
            console.log("Error carts loaded",error)
        }
    }

    async addCart(products){
        await this.loadCarts()
        const id = uuid4();
        if (products) {
            this.carts.push({
                id:id,
                products:[]
            })   
            await this.updateCarts();
        } else {
            return "Error invalid parameters"
        }
    }

    async getCarts(){
        await this.loadCarts()
        if(this.carts){
            return this.carts
        }else{
            console.log("Cart not found");
        }
    }

    async getCartId(cid){
        await this.loadCarts()
        const cartExist = this.carts.find(cart => cart.id == cid);
        if(cartExist){
            return cartExist.products
        }else{
            console.log(`Failed to get Cart, Cart ${cid} was not found`);
        }
    }

    async addProductsToCarts(cid, id){
        await this.loadCarts()
        const indexCart = this.carts.findIndex(cart => cart.id == cid)
        const cartExist = this.carts.find(cart => cart.id == cid);;
        const productExist = await productAll.getProductById(id);
        if(!cartExist){
            return("EL CARRITO NO EXISTE");
        } else if (!productExist){
            return("EL PRODUCTO NO EXISTE");
        }else{
            const productInCart = cartExist.products.findIndex(prod => prod.idProduct == id)
            if (productInCart === -1) {

                cartExist.products.push({
                    idProduct: id,
                    quantity: 1
                })
            this.carts[indexCart] = cartExist
            await this.updateCarts()
            }else{
                cartExist.products[productInCart].quantity++
                this.carts[indexCart] = cartExist
                await this.updateCarts()
            }
        }
    } 
}


const cart = new CartManager("carts.json");
