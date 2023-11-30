import mongoose, {Schema} from 'mongoose';


const product = new Schema({
    name: {type: String, require: true, unique: false},
    description: {type: String, require: true, unique: false},
    imgURI: {type: String, require: true, unique: false},
    author: {type: String, require: true, unique: false},
    price: {type: Object, required: true},
    category: {type: String, require: false},
    arrayImg: {type: [String], require: false},
    buys: {type: Number, require: true},
    created_at: {type: Date, default: Date.now()},
    key_stripe: {type: String, require: true, unique: false},
    email: {type: String, require: true, unique: false}
})

export default mongoose.model("Products", product);