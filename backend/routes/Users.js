const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");


//get all the users
router.get("/",(req,res)=>{
    User.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    }).populate("user").sort({createdAt: "desc"})

});

//get user base on id
router.get("/:id",(req,res)=>{
    User.findById(req.params.id)
        .then(user=>res.status(500).send(user))
        .catch(err => res.status(400).json('Error: ' + err))
});


//user register
router.post("/register",(req,res)=>{
    const {name, email, password, password1, date} = req.body;
    bcrypt.genSalt(10,(err,salt)=>bcrypt.hash(password, salt,(err,hash)=> {
        let password = hash
        User.create(req.body, (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(201).send(`new message created: \n ${data}`)
            }
        })
    }))

});

module.exports=router
