import { Request, Response } from "express";
import ProductsModel from "../models/Products.model";

export default class ProductsControllers{
    req: Request;
    res: Response;
    productsDB: typeof ProductsModel;

    constructor(req: Request, res: Response){
        this.req = req;
        this.res = res;
        this.productsDB = ProductsModel;
    }

    getProducts = async() =>{
        this.res.json(await this.productsDB.find())
    }

    getProductCategorie = async(categorie: string) =>{
        this.res.json(await this.productsDB.find({category: categorie}));
    }

    getProductByID = async(id: string, ret: boolean = false) =>{
        if(!ret){
          this.res.json(await this.productsDB.findById(id))  
        }
        else{
            return await this.productsDB.findById(id)
        }
    }

    createProduct = async(name: string, description: string, imgURI: string, author: string, price: number, category: string, arrayImg: Array<string>, buys: number, key_stripe: string) =>{
        const newProduct = new this.productsDB({
            name: name,
            description: description,
            imgURI: imgURI,
            author: author,
            price: price,
            category: category,
            arrayImg: arrayImg,
            buys: buys,
            key_stripe: key_stripe
        });

        await newProduct.save();
        this.res.json('product create');
    }

    updateProduct = async(id: number, name: string, description: string, imgURI: string, author: string, price: number, category: string, arrayImg: Array<string>, buys: number, key_stripe: string) =>{
        await this.productsDB.findByIdAndUpdate(id, {
            name: name,
            description: description,
            imgURI: imgURI,
            author: author,
            price: price,
            category: category,
            arrayImg: arrayImg,
            buys: buys,
            key_stripe: key_stripe
        })

        this.res.json({"update id": id});
    }

    deleteProduct = async(id: number) => {
        await this.productsDB.findByIdAndDelete(id);

        this.res.json({"remove id": id})
    }

    searchProduct = async(searchinp: string)=>{
        try {
            // user reggex expression for search words similar in the input name
            const nameResults = await this.productsDB.find({ name: { $regex: searchinp, $options: 'i' } });
    
            //use reggex expression for search words similar in the input categoria
            const categoryResults = await this.productsDB.find({ category: { $regex: searchinp, $options: 'i' } });
    
            // combine result category and name
            const results = [...nameResults, ...categoryResults];
    
            // if exist the results, return them
            if (results.length > 0) {
                this.res.status(200).json(results);
            } else {
                // if not found, so not return
                this.res.status(404);
            }
        } catch (err) {
            this.res.status(500).send(err);
        }
    }

    getProductsByAuthor = async(author: string) =>{
        try{
            this.res.status(200).json(await this.productsDB.find({author: author}))
        }
        catch (err) {
            this.res.status(500).send(err);
        }
    }
}