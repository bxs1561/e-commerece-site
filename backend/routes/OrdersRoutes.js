const express = require("express");
const router = express.Router();
const Order = require("../model/Orders")
const mongoose = require("mongoose")
const {ensureAuth} = require("../Auth")



router.post("/add",ensureAuth,(req,res)=>{
    req.body.user = req.user
    req.body.products = req.products
    // req.user.password = ""



    // const newOrder =  Order({
    //     // address: req.address,
    //     user:req.user,
    //     products: req.products,
    // })
    Order.create(req.body).then(result=>{
        res.status(201).json({
            Orders: result
        })
    }).catch(err=>{
        res.status(500).json({error:err})
        console.log(err)
    })
})

router.get("/",(req,res)=>{
    Order.find().populate("user","-password").populate("product").then(result=>{
        res.json({
            Count:result.length,
            Orders:result})
    })
})

router.get("/:id",(req,res)=>{
    Order.findById(req.params.id).populate("user").populate("product").then(result=>{
        res.json(result)
    })
})
router.get("/user/:userId",ensureAuth,(req,res)=>{
    Order.find({user:req.params.userId},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).json({Order:data})
        }
    }).populate("user").populate("product")
    console.log(req.user)

})

//get orders by email
router.get("/:userId",(req,res)=>{
    Order.findById(req.params.id
    ).then(result=>{
        res.json(result)
    })
})




module.exports = router
