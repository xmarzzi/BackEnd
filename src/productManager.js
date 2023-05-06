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
        try {
            this.products = JSON.parse(fs.readFileSync(this.path))
            if(this.products.length>0){
            this.idAutoInc=this.products[this.products.length-1].id
            }
            
        } catch (error) {
            console.log("Error loaded",error)
        }
        
    }
    async updateDB(){
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null , 2)) 
        } catch (error) {
            console.log("Error loaded",error)
        }
    }
    
    async addProduct({title,description,code,price,stock,category,thumbnails=[]}){
        await this.loadDB()
        this.idAutoInc++
        const repeatedProduct = this.products.some(item => item.code === code)
        if(repeatedProduct === false && title && description && code && price && stock && category || thumbnails){
            this.products.push({
                id:this.idAutoInc,
                title: title,
                description:description,
                code:code,
                price:price,
                status:true,
                stock:stock,
                category:category,
                thumbnails:thumbnails

            })
            await this.updateDB()
            

        }else{
            return "Error, duplicated product, or invalid parameters";
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
            return `Failed to get Product, Product ${id} was not found`;
        }
    }

    async updateProduct(id,parameters){
        await this.loadDB()
        
        const index = this.products.findIndex(product => product.id == id)
        if(index !== -1){
            const parameterTitle=parameters.title ?? this.products[index].title;
            const parameterDescription=parameters.description ?? this.products[index].description;
            const parameterCode=parameters.code ?? this.products[index].code;
            const parameterPrice=parameters.price ?? this.products[index].price;
            const parameterCategory=parameters.category ?? this.products[index].category;
            const parameterStock=parameters.stock ?? this.products[index].stock;
            const parameterThumbnails=parameters.thumbnails ?? this.products[index].thumbnails;
    
            this.products[index] = {
                id:id,
                title:parameterTitle,
                description:parameterDescription,
                code:parameterCode,
                price:parameterPrice,
                status:true,
                stock:parameterStock,
                category:parameterCategory,
                thumbnails:parameterThumbnails
            }
            await this.updateDB()
        }else{
            return `Product ${id} was not found`; 
        }
    }

    async deleteProduct(id){
        await this.loadDB()
        const index = this.products.findIndex(product => product.id == id)
        if(index !== -1){
            this.products.splice(index,index+1)
            await this.updateDB()
            console.log("product deleted succesfully")
          }else{
            return `Failed to Delete Product, Product ${id} was not found`;
          }
        }
    }

    const merch = new ProductManager("products.json");

    // TEST
    // ADD PRODUCTS
    /*merch.addProduct({title: "SPITFIRE HOODIE BIGHEAD", description: "Hoddie color naranja, con estampa al frente.", code: "2Hoddie", price: 10000, stock: 5, category: "Indumentary", thumbnails: "spitfire.jpg" })
    merch.addProduct({title: "SINCOPE DECK KOALA BUONA PASTA 8.25", description: "Tabla skate Sincope",code: "20Deck", price: 15000, stock: 7, category: "Deck Skate", thumbnails:"sincope.jpg"})
    merch.addProduct({title: "TABLA CREATURE GRAPHIC MONSTER MOBILE 8", description: "Tabla Creature",code: "21Deck", price: 21300, stock: 9, category: "Deck Skate", thumbnails:"creature.jpg"})
    merch.addProduct({title: "DECK CLEAVER MARTINEZ KEYS BLANCO", description: "Tabla skate Cleaver",code: "22Deck", price: 18200, stock: 12, category: "Deck Skate", thumbnails:"cleaver.jpg"})
    merch.addProduct({title: "DECK SANTA CRUZ SALBA TIGER HAND BORDO 9.25", description: "Tabla Santa Cruz",code: "23Deck", price: 30000, stock: 16, category: "Deck Skate", thumbnails:"deckSC.jpg"})
    merch.addProduct({title: "NIKE AIR FORCE",description: "blanca",code: "31AirF", price: 30000, stock: 12, category: "Shoes",thumbnails:"Nike.jpg"})
    merch.addProduct({title: "VANS OLD SCHOOL",description: "Un clásico",code: "32Va", price: 23000, stock: 20, category: "Shoes", thumbnails:"VANS.jpg"})
    merch.addProduct({title: "VANS X NatGeo",description: "Colaboración con NatGeo", code: "33VaNG", price: 20000, stock: 7, category: "Shoes", thumbnails:"vansNatGeo.jpg"})
    merch.addProduct({title: "VANS X THE SIMPSONS",description: "Colaboración con Simpsons", code: "34VaS", price: 25000, stock: 8, category: "Shoes", thumbnails:"vanSimp.jpg"})
    merch.addProduct({title: "PANTALÓN NEW BALANCE UNISSENTIAL SWEA", description: "Ofrece una expresión sin género del estilo clásico de esta marca.", code: "35NBPants", price: 15200, stock: 10, category: "Indumentary", thumbnails:"NewBalancePants.jpg"})
    merch.addProduct({title: "CAMPERA ADIDAS ORIGINALS 3 STRIPE WRAP", description: "Confeccionada en tejido poliéster 100% reciclado, cierre delantero, cuello alzado , bolsillos frontales con cremallera.", code: "36Adid", price: 2700, stock: 15, category: "Indumentary", thumbnails:"camperaAdidas.jpg"})

    console.log(merch.getProducts())*/

    // UPDATE PRODUCTS
    /*merch.updateProduct(1,{price:19000,stock:12});

    console.log(merch.getProducts())*/


    // DELETE PRODUCTS FOR ID
    /*merch.deleteProduct(0);

    console.log(merch.getProducts())*/