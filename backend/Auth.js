const jwt = require("jsonwebtoken")
const User = require("./model/User")
const Address = require("./model/Address")
const Product = require("./model/Product")
const Order = require("./model/Order")

//protected route
module.exports = {
    ensureAuth: function (req, res, next) {
        const {authorization}= req.headers
        if(!authorization){
            return res.status(401).json({error: "you must logged in to "})
        }
        const token = authorization.replace("Bearer ","")
        jwt.verify(token, "secretkey",(err,payload)=>{
            if(err){
                return res.status(401).json({error: "You must be logged in"})
            }
            const{_id} = payload
            User.findById(_id).then(userData=>{
                req.user = userData
                next()
            })
            Order.findById(_id).then(orderData=>{
                req.order = orderData
                next()
            })
            Product.findById(_id).then(productData=>{
                req.products = productData
                next()
            })
            // Address.findById(_id).then(addressData=>{
            //     req.address = addressData
            //     next()
            // })


        })
        }
}
