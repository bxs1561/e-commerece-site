const express = require("express");
const router = express.Router();
const Address = require("../model/Address");


//get all the address of the user
router.get("/address",(req,res)=>{

    Address.find((err,data)=> {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({Address:data})
        }
    })
    console.log(req.product)
    //above for product it will only show id and name of product not all
})


router.post("/address",(req,res)=>{
    const {address,city,state,zipCode,phone} = req.body;
    if(!address || !city || !state || !zipCode || !phone){
        return res.status(500).json({error: "Please fill in the fields"})
    }
    //not store passwords with user
    // req.user.password = undefined
    // req.body.user = req.user.id

    const newAddress = new Address({
        address,
        city,
        state,
        zipCode,
        phone,
        // user: req.user,
        // product: req.product

    })
    newAddress.save().then(address=>{
        res.json({Address:address})
    })
    console.log(req.user)


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



module.exports = router;
