import { Request, Response } from "express";
import ProductsModel from "../models/Products.model";
import CarShopModel from "../models/CarShop.model";
import ProductsControllers from "./products.controllers";
import mongoose from "mongoose";

export default class Carshop extends CarShopModel {
    req: Request;
    res: Response
    productsdb: typeof ProductsModel;
    carshop: typeof CarShopModel

    constructor(req: Request, res: Response) {
        super();
        this.req = req;
        this.res = res;
        this.productsdb = ProductsModel;
        this.carshop = CarShopModel;
    }

    viewProductsInCar = async (user: string) => {
        const productscar = await this.carshop.findOne({ user: user })

        this.res.status(200).json(productscar);
    }

    addNewProduct = async (user: string, newproduct: string) => {
        console.log(user);
        this.carshop.findOne({ user: user })
            .then(async (result) => {
                if (result) {
                    this.carshop.findOneAndUpdate(
                        { user: user },
                        { $push: { products: newproduct } },
                        { new: true }
                    )
                        .then((_res) => {
                            this.res.status(200).send("add new product car");
                        })
                        .catch((err) => {
                            this.res.status(500).send(err);
                        });
                } else {
                    const newshop = new this.carshop({
                        user: user,
                        products: [newproduct],
                    });
                    await newshop.save();
                    this.res.status(200).send("add new product car");
                }
            })
            .catch((err) => {
                this.res.status(500).send(`error in db ${err}`);
            });
    }

    returnProductsByIds = async (arraysId: Array<string>) => {
        const products = new ProductsControllers(this.req, this.res)
        const newArray: any[] = [];

        await Promise.all(arraysId.map(async (e, index: number) => {
            const product = await products.getProductByID(e, true);
            newArray[index] = {
                id: product?.id,
                name: product?.name,
                price: product?.price,
                imgURI: product?.imgURI,
                key_stripe: product?.key_stripe,
                email: product?.email
            };
        }));

        // Luego, envía la respuesta después de que todas las Promesas se hayan resuelto
        this.res.status(200).json(newArray);
    }

    deleteProductcarShop = async (id: string, user: string) => {
        this.carshop.findOne({ user: user }).then((res) => {
            if (res) {
                this.carshop.findOneAndUpdate(
                    { user: user },
                    { $pull: { products: id } },
                    { new: true }
                )
                    .then(() => {
                        this.res.status(200).send("product delete")
                    })
                    .catch(() => {
                        this.res.status(500).send("error in to db");
                    })
            }
            else {
                this.res.status(500).send('user not found in db');
            }
        }).catch(err => {
            console.log(err);
            this.res.status(500).send('an ocurre error in db');
        })
    }

    EmptyProduct = (id: string, user: string) =>{
        this.carshop.findOne({user: user, products: new mongoose.Types.ObjectId(id)})
        .then((res)=>{
            if(res){
              this.res.status(200).send("product exist in carshop")  
            }
            else{
                this.res.status(404).send("product not exist in carshop")  
            }
        })
        .catch((err)=>{
            this.res.status(500).send(err);
        })
    }
}