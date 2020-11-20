const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true
    }
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // }
})
const Products = mongoose.model("Product", productSchema);
module.exports = Products;
