const express = require("express")
const stripe = require("stripe")(secretKey)
const router = express.Router();
const cors = require('cors');

require('dotenv').config();

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
