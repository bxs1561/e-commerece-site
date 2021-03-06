const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true
    },
    image:{
        type: String,
        required: true
    }
})
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
