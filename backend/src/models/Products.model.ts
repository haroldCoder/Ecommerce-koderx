import mongoose, {Schema} from 'mongoose';


const product = new Schema({
    name: {type: String, require: true, unique: false},
    description: {type: String, require: true, unique: false},
    imgURI: {type: String, require: true, unique: false},
    author: {type: String, require: true, unique: false},
    price: {type: Object, required: true},
    category: {type: String, require: false},
    arrayImg: {type: [String], require: false},
    buys: {type: Number, require: true}
})

export default mongoose.model("Products", product);