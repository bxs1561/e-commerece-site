const express = require("express");
const router = express.Router();
const Product =require("../model/Products");


//get all the products
router.get("/",(req,res)=>{
    Product.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
});

//find product by name
router.get("/:name",(req,res)=>{
    Product.findOne({name: req.params.name},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
});

//add product
router.post("/add",(req,res)=>{
    Product.create(req.body,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
});

//search product by id
router.get("/:id",(req,res)=>{
    Product.findById(req.params.id,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
});


module.exports = router
