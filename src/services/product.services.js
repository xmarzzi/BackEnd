import { productsModel } from "../Dao/Models/products.models.js";

export class productServices {
    
        
  
        async getAll() {
            const users = await productsModel.find({});
            return users;
          }

        async getProductById(id) {
            const product = await productsModel.findById(id);
            if(product){
                return res.status(200).json({
                    status:"Success",
                    msg:`Displaying product ${id}`,
                    data:product
                });
            }else{
                return res.status(400).json({
                    status:"Error",
                    msg:`product ${id} does not exist`
                });
            };
        }

        async postProduct({title,description,code,price,stock,category,thumbnails}) {
          
            const productCreated = await productsModel.create({title,description,code,price,stock,category,thumbnails});
        
            return res.status(200).json({
                status:"Success",
                msg:"Producto agregado",
                data:productCreated
            });
    
        }

        async updateProduct(id,modific){
            const update = await manager.updateProduct(id,modific);
            if (!update) {
                return res.status(200).json({
                    status:"Success",
                    msg:"Modified product",
                    data:modific
                });
            }else{
                return res.status(400).json({
                    status:"Error",
                    msg:update,
                });
            }

        }

        async deletedProduct(_id) {
            const deleted = await UserModel.deleteOne({ _id: _id });
            if (!deleted) {
                return res.status(400).json({
                    status:"Error",
                    msg:"Product does not exist"
                });
                } else {
                    await manager.deleteProduct(id)
                    return res.status(200).json({
                        status:"Sucess",
                        msg:`The product with ID: ${id} was deleted`,
                        data: deleted
                    });
                }
         }
}
