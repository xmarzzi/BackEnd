import fs from "fs";

if (!fs.existsSync("products.json")) {
    fs.writeFileSync("products.json", "[]");
    }

export default class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path
        this.idAutoInc = -1
    }
    async loadDB(){
        try{
            this.products = JSON.parse(fs.readFileSync(this.path))
            if(this.products.length>0){
            this.idAutoInc=this.products[this.products.length-1].id
            }
        }catch(err){
            console.log("Error loading database")
        }
    }

    async updateDB(){
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.products ,null, 2))
        }catch(err){
            console.log("Error updating database")
        }

    }
    
    async addProduct({title, description, code, price, status, stock, category, thumbnails}){
        await this.loadDB()
        this.idAutoInc++
        const productIfRepeated = this.products.some(item => item.code === code)
        if(productIfRepeated === false && title && description && code && price && status && stock && category){
            this.products.push({
                id:this.idAutoInc,
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnails: thumbnails  
            })
            await this.updateDB()
        }else{
            console.log("Error, duplicated product or invalid parameters")
        }
    }

    async getProducts(){
        await this.loadDB()
        if(this.products){
            return this.products
        }else{
            console.log("Product list is empty.");
        }
       
    }

    async getProductById(id){
        await this.loadDB()
        const productIfExists = this.products.find(product => product.id == id)
        if(productIfExists){
            return productIfExists
        }else{
            console.log(`Failed to get Product, Product ${id} was not found`)
        }
    }

    async updateProduct(id,parameters){
        await this.loadDB()
        const index = this.products.findIndex(product => product.id === id)
        if(index !== -1){
            for (const property in this.products[index]) {
                this.products[index][property]=parameters[property] ?? this.products[index][property]
            }
            await this.updateDB()
            console.log(`Product ${id} Updated`) 
        }else{
            console.log(`Product ${id} was not found`) 
        }
    }

    async deleteProduct(id){
        await this.loadDB()
        const index = this.products.findIndex(product => product.id === id)
        if(index !== -1){
            this.products.splice(index,index+1)
            await this.updateDB()
            console.log(`Product ${id} Deleted succesfully`)
        }else{
            console.log(`Failed to Delete Product, Product ${id} was not found`)
        }
    }
}


