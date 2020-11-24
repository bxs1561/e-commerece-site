const mongoose =require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    // address: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Address",
    //     required: true
    // },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }

})
const Orders = mongoose.model("Order",orderSchema);
module.exports = Orders
