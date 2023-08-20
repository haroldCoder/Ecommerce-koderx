import ProductsControllers from "../controllers/products.controllers";
import {Request, Response, Router} from 'express';

const router = Router();

router.route("/products")
.get((req: Request, res: Response)=>{
    new ProductsControllers(req, res).getProducts();
})

.post((req: Request, res: Response)=>{
    const {name, description, imgURI, author, price, category, arrayImg, buys} = req.body;
    new ProductsControllers(req, res).createProduct(name, description, imgURI, author, price, category, arrayImg, buys);
})

router.route("/products/:id")
.patch((req: Request, res: Response)=>{
    const {id} = req.params;
    const {name, description, imgURI, author, price, category, arrayImg, buys} = req.body;

    new ProductsControllers(req, res).updateProduct(parseInt(id), name, description, imgURI, author, price, category, arrayImg, buys)
})

.delete((req: Request, res: Response)=>{
    const {id} = req.params;

    new ProductsControllers(req, res).deleteProduct(parseInt(id));
})