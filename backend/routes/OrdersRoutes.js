const express = require("express");
const router = express.Router();
const Order = require("../model/Order")
const mongoose = require("mongoose")
const {ensureAuth} = require("../Auth")
const nodemailer = require('nodemailer')
const Product = require("../model/Product")




router.post("/add",ensureAuth,(req,res)=>{
    req.body.user = req.user
    req.body.products = req.products
    // console.log(req.body)
    // req.body.address = req.address
    //send email with products and user
    Product.findById(req.body.product).then(products=>{
            const output = `<p> you have new order request</p>


<h3>Order Details</h3>
<ul>
<li>Name: ${req.user.name} </li>
<li>Email: ${req.user.email} </li>
</ul>

<h3>Product</h3>
<ul>
<li>Name: ${products.title}</li>
<img src="${products.image}" width="20%" height="20%" alt="${products.title}"/>
<li>Price: ${products.price}</li>
</ul>`;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "jamebuddha@gmail.com", // generated ethereal user
                pass: "bikidada", // generated ethereal password
            },
            //When using localhost
            tls: {
                rejectUnauthorized: false

            }
        });

        // send mail with defined transport object
        let info =  transporter.sendMail({
            from: '"Bikram subedi 👻" <bik@gmail.com>', // sender address
            to: req.user.email, // list of receivers
            subject: "Your orders ✔", // Subject line
            text: "Hello world?", // plain text body
            html: output, // html body
        });




    }).catch(error=>{
        return res.status(500).send(error)
    })

    // req.user.password = ""

    // const newOrder =  Order({
    //     // address: req.address,
    //     user:req.user,
    //     products: req.products,
    // })

    Order.create(req.body).then(result=>{
        return res.status(201).json({
            Orders: result
        })
    }).catch(error=>{
        return res.status(500).send(error)
        // console.log(err)
    })
})

router.get("/",(req,res)=>{
    Order.find().populate("user","-password").populate("product").populate("address").sort("desc").then(result=>{
        res.json({
            Count:result.length,
            Orders:result})
    }).catch(error=>{
        res.status(500).json(error)
    })
})

router.get("/:id",(req,res)=>{
    Order.findById(req.params.id).populate("user").populate("product").then(result=>{
        res.json(result)
    }).catch(error=>{
        res.status(500).json(error)
    })
})
router.get("/user/:userId",(req,res)=>{
    Order.find({user:req.params.userId},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).json({
                Count: data.length,
                Order:data})
        }
    }).populate("user").populate("product")

})






module.exports = router
