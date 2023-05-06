import fs from "fs";
import ProductManager from "./productManager.js";

const productAll = new ProductManager

if (!fs.existsSync ("carts.json")){
    fs.writeFileSync("carts.json", "[]")
};

export default class CartManager{
    constructor(path) {
        this.carts = [];
        this.path = path
        this.idAutoInc = -1
    }
    async loadCarts(){
        try {
            this.carts = JSON.parse(fs.readFileSync(this.path))
            if(this.carts.length>0){
                this.idAutoInc=this.carts[this.carts.length-1].id
            }
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
        this.idAutoInc++
        if (products) {
            this.carts.push({
                id:this.idAutoInc,
                products: [{id:"", quantity:""}]
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
            return cartExist
        }else{
            return `Failed to get Cart, Cart ${cid} was not found`;
        }
    }

    async addProductsToCarts(cid, id){
        
            let carts = await this.getCarts();
            const cartIndex = carts.findIndex(cart => cart.id === cid);
            if(cartIndex === -1){
                console.log('Cart not found');
            }
            const productIndex = carts[cartIndex].products.findIndex(product => product.id === id);
            if (productIndex === -1) {
                carts[cartIndex].products.push({
                    id:id, quantity: 1
                })
            } else {
                carts[cartIndex].products[productIndex].quantity++
            }
            await this.updateCarts();
       
    } 
}


const cart = new CartManager("carts.json");
