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

    createProduct = async(name: string, description: string, imgURI: string, author: string, price: number, category: string, arrayImg: Array<string>, buys: number) =>{
        const newProduct = new this.productsDB({
            name: name,
            description: description,
            imgURI: imgURI,
            author: author,
            price: price,
            category: category,
            arrayImg: arrayImg,
            buys: buys
        });

        await newProduct.save();
        this.res.json('product create');
    }

    updateProduct = async(id: number, name: string, description: string, imgURI: string, author: string, price: number, category: string, arrayImg: Array<string>, buys: number) =>{
        await this.productsDB.findByIdAndUpdate(id, {
            name: name,
            description: description,
            imgURI: imgURI,
            author: author,
            price: price,
            category: category,
            arrayImg: arrayImg,
            buys: buys
        })

        this.res.json({"update id": id});
    }

    deleteProduct = async(id: number) => {
        await this.productsDB.findByIdAndDelete(id);

        this.res.json({"remove id": id})
    }
}