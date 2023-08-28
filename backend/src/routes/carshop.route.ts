import {Request, Response, Router} from 'express';
import Carshop from '../controllers/carshop.controllers';

const router = Router();

router.route("/carshop/:user")
.get((req: Request, res: Response)=>{
    const {user} = req.params;

    new Carshop(req, res).viewProductsInCar(user);
})

router.route("/carshop")
.post((req: Request, res: Response)=>{
    const {user, newProduct} = req.body;

    new Carshop(req, res).addNewProduct(user, newProduct);
})

module.exports = router;