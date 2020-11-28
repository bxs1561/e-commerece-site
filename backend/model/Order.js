const mongoose =require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
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
const Order = mongoose.model("Order",orderSchema);
module.exports = Order
