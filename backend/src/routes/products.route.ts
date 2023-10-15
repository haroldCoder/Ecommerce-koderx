import ProductsControllers from "../controllers/products.controllers";
import {Request, Response, Router} from 'express';

const router = Router();

router.route("/products")
.get((req: Request, res: Response)=>{
    if(!req.query.categorie){
       new ProductsControllers(req, res).getProducts(); 
    }
    else{
        new ProductsControllers(req, res).getProductCategorie(req.query.categorie as string);
    }
})

.post((req: Request, res: Response)=>{
    const {name, description, imgURI, author, price, category, arrayImg, buys, key_stripe} = req.body;
    new ProductsControllers(req, res).createProduct(name, description, imgURI, author, price, category, arrayImg, buys, key_stripe);
})

router.route("/products/:id")

.get((req: Request, res: Response)=>{
    const {id} = req.params;

    new ProductsControllers(req, res).getProductByID(id);
})

.patch((req: Request, res: Response)=>{
    const {id} = req.params;
    const {name, description, imgURI, author, price, category, arrayImg, buys, key_stripe} = req.body;

    new ProductsControllers(req, res).updateProduct(parseInt(id), name, description, imgURI, author, price, category, arrayImg, buys, key_stripe)
})

.delete((req: Request, res: Response)=>{
    const {id} = req.params;

    new ProductsControllers(req, res).deleteProduct(parseInt(id));
})

router.route("/products/search/:search")
.get((req: Request, res: Response)=>{
    const {search} = req.params;
    new ProductsControllers(req, res).searchProduct(search);
})

router.route("/products/author/:author")
.get((req: Request, res: Response)=>{
    const {author} = req.params;
    new ProductsControllers(req, res).getProductsByAuthor(author);
})

module.exports = router;