import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectionDB from './connection/mongodb_connect';
import AuthMiddleware from './middleware/security.middleware';
const PORT = process.env.PORT || 4500
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json())

const authMiddleware = new AuthMiddleware(process.env.SECRET_KEY as string);

app.use("/api", authMiddleware.authenticate.bind(authMiddleware), require("./routes/products.route"))

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
    new ConnectionDB();
})