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
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // }
})
const Products = mongoose.model("Product", productSchema);
module.exports = Products;
