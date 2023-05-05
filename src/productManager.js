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
            console.log("Error loaded")
        }
        
    }
    async updateDB(){
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null , 2)) 
        } catch (error) {
            console.log("Error loaded")
        }
    }
    
    async addProduct(title,description,code,price,stock,category,thumbnails){
        await this.loadDB()
        this.idAutoInc++
        const repeatedProduct = this.products.some(item => item.code === code)
        if(repeatedProduct === false && title && description && code && price && stock && category && thumbnails){
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
            console.log("Error, duplicated product, or invalid parameters")
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
            console.log(`Product ${id} was not found`) 
        }
    }

    async deleteProduct(id){
        await this.loadDB()
        const index = this.products.findIndex(product => product.id === id)
        if(index !== -1){
            this.products.splice(index,index+1)
            await this.updateDB()
            console.log("product deleted succesfully")
          }else{
            console.log(`Failed to Delete Product, Product ${id} was not found`)
          }
        }
    }

    const merch = new ProductManager("products.json");

    // TEST
    // ADD PRODUCTS

    /*merch.addProduct("SPITFIRE HOODIE BIGHEAD", "Hoddie color naranja, con estampa al frente.", "2Hoddie", 10000, 5, "Indumentary", "spitfire.jpg" )
    merch.addProduct("SINCOPE DECK KOALA BUONA PASTA 8.25", "Tabla skate Sincope","20Deck", 15000, 7, "Deck Skate","sincope.jpg")
    merch.addProduct("TABLA CREATURE GRAPHIC MONSTER MOBILE 8", "Tabla Creature","21Deck", 21300, 9, "Deck Skate", "creature.jpg")
    merch.addProduct("DECK CLEAVER MARTINEZ KEYS BLANCO", "Tabla skate Cleaver","22Deck", 18200, 12, "Deck Skate", "cleaver.jpg")
    merch.addProduct("DECK SANTA CRUZ SALBA TIGER HAND BORDO 9.25", "Tabla Santa Cruz","23Deck", 30000, 16, "Deck Skate", "deckSC.jpg")
    merch.addProduct("Nike Air Force one","blanca","31AirF", 30000, 12, "Shoes","Nike.jpg")
    merch.addProduct("Vans old","Un clásico","32Va", 23000, 20, "Shoes", "VANS.jpg")
    merch.addProduct("Vans x NatGeo","Colaboración con NatGeo", "33VaNG", 20000, 7, "Shoes", "vansNatGeo.jpg")
    merch.addProduct("Vans x Simpsons","Colaboración con Simpsons", "34VaS", 25000, 8, "Shoes", "vanSimp.jpg")
    merch.addProduct("Pantalón New Balance Unissentials Swea", "Ofrece una expresión sin género del estilo clásico de esta marca.", "35NBPants", 15200, 10, "Indumentary", "NewBalancePants.jpg")
    merch.addProduct("Campera adidas originals 3 Stripe Wrap", "Confeccionada en tejido poliéster 100% reciclado, cierre delantero, cuello alzado , bolsillos frontales con cremallera.", "36Adid", 2700, 15, "Indumentary", "camperaAdidas.jpg")

    console.log(merch.getProducts())*/

    // UPDATE PRODUCTS
    /*merch.updateProduct(1,{price:19000,stock:12});

    console.log(merch.getProducts())*/


    // DELETE PRODUCTS FOR ID
    /*merch.deleteProduct(0);

    console.log(merch.getProducts())*/