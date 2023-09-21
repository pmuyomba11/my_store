const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    img: { type: String },
    price: { type: Number },
    qty: { type: Number, min: 0 }
},
    { timestamps: true }
)

const Products = mongoose.model('Products', productSchema);
module.exports = Products;