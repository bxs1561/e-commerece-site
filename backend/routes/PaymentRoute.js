const express = require("express")
require('dotenv').config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const router = express.Router();



router.post("/create/:total",async (req,res)=>{
    const total = req.params.total

    const payment = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    })
     res.status(201).send({
        clientSecret: payment.client_secret,
    });
})


module.exports = router
