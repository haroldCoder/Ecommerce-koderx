import {Request, Response, Router} from 'express';
import Carshop from '../controllers/carshop.controllers';

const router = Router();

router.route("/carshop/:user")
.get((req: Request, res: Response)=>{
    const {user} = req.params;

    new Carshop(req, res).viewProductsInCar(user);
})

router.route("/carshop-ids")
.post((req: Request, res: Response)=>{
    const {arrayids} = req.body;

    new Carshop(req, res).returnProductsByIds(arrayids);
})

router.route("/carshop")
.post((req: Request, res: Response)=>{
    const {user, newProduct} = req.body;

    new Carshop(req, res).addNewProduct(user, newProduct);
})

router.route("/carshop/:id/:user")
.delete((req: Request, res: Response)=>{
    const {id, user} = req.params;

    new Carshop(req, res).deleteProductcarShop(id, user);
})

module.exports = router;