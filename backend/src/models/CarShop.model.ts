import mongoose, {Schema} from 'mongoose';


const carshop = new Schema({
    user: {type: String, require: true, unique: true},
    products: {type: [String], require: true, unique: false}
})

export default mongoose.model("carShop", carshop);