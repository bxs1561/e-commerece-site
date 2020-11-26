const express = require("express");
const router = express.Router();
const Address = require("../model/Address");
const {ensureAuth} = require("../Auth")
const User = require("../model/User")



//get all the address of the user
router.get("/address",(req,res)=>{

    Address.find((err,data)=> {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({
                Count: data.length,
                Address:data})
        }
    }).populate("user")
    //above for product it will only show id and name of product not all
})


router.post("/address",ensureAuth,(req,res)=>{
    const {address,city,state,zipCode,phone} = req.body;
    if(!address || !city || !state || !zipCode || !phone){
        return res.status(500).json({error: "Please fill in the fields"})
    }
    //not store passwords with user
    // req.user.password = undefined
    // req.body.user = req.user.id
    // User.findById(req.user.id).then(user=>{
        const newAddress = new Address({
            address,
            city,
            state,
            zipCode,
            phone,
            user: req.user
        })
        newAddress.save().then(address => {
            return res.json({Address: address})
        }).catch(error => {
            return res.status(500).send(error)
        })
});

//show single address
router.get("/:id",(req,res)=> {
    Address.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})
router.get("/user/:userId",(req,res)=>{
    Address.find({user:req.params.userId},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).json({
                Count: data.length,
                Address:data})
        }
    }).populate("user")

})



module.exports = router;
