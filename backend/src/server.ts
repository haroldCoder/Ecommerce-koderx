import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectionDB from './connection/mongodb_connect';
import AuthMiddleware from './middleware/security.middleware';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json())

const authMiddleware = new AuthMiddleware(process.env.SECRET_KEY as string);

app.use("/api", require("./routes/products.route"))

app.listen(4500, ()=>{
    console.log(`Server on port 4500`);
    new ConnectionDB();
})