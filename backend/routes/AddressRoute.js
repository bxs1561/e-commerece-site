const express = require("express");
const router = express.Router();
const Address = require("../model/Address");



//get all the address of the user
router.get("/address",(req,res)=>{

    Address.find((err,data)=> {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    }).populate("user").populate("product").exec()
})


router.post("/address",(req,res)=>{
    const {address,city,state,zipCode,phone} = req.body;
    // req.body.user = req.user.id

    Address.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
    console.log(req.body)

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
    }).populate("user")
})



module.exports = router;
