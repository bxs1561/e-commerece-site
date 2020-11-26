const express = require("express");
const router = express.Router();
const Product =require("../model/Product");
const {ensureAuth} = require("../Auth")



//get all the products
router.get("/",(req,res)=>{
    Product.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    }).populate("product")

});

//search product by id
router.get("/:id",(req,res)=> {
    Product.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})



//add product
router.post("/add",(req,res)=>{
    console.log(req.body._id)
    Product.create(req.body,(err,data)=>{
        if(err){
            return res.status(500).send(err)
        }
        else{
            return res.status(201).send(data)
        }
    })
});
router.get("/products/:title",(req,res)=>{
    Product.findOne({title: req.params.title},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
});




module.exports = router
