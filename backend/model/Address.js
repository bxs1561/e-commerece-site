const mongoose = require("mongoose");
const{object}= mongoose.Schema.Types

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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})
const Address = mongoose.model("Address", addressSchema);
module.exports = Address;

