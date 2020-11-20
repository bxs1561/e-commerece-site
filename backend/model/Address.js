const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
})
const Address = mongoose.model("Address", addressSchema);
module.exports = Address;

