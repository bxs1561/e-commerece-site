const jwt = require("jsonwebtoken")
const User = require("./model/User")

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
            })
            next()
        })
        }
}
