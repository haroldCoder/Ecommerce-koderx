import mongoose from "mongoose";

export default class ConnectionDB{
    connection: mongoose.Connection = mongoose.connection;

    constructor(){
        mongoose.connect(process.env.MONGO_URI || "",{})

        this.connection.once('open', ()=>{
            console.log('db connected');
        })
    }
}