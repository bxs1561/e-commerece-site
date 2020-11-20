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

router.post("/signin",(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(422).json({error:"Please fill in the email or password"})
    }
    User.findOne({email:email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error: "invalid email"})
            }
            bcrypt.compare(password,user.password,(match)=>{
                if(match){
                    res.json({message: "Succesfully sign in"})
                }
                else{
                    return res.status(422).json({error: "invalid email or password"})
                }

            }).catch(err=>{
                console.log(err)
            })
    })
})


//get user base on id
router.get("/:id",(req,res)=>{
    User.findById(req.params.id)
        .then(user=>res.status(500).send(user))
        .catch(err => res.status(400).json('Error: ' + err))
});


//user register
router.post("/register",(req,res)=>{
    const {email} = req.body
    let errors=[]
    //if user exist
    User.findOne({email:email}).then(user=>{
        if(user){
            console.log("user exist")
        }
        const {name, email, password, password1, date} = req.body;
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash
            User.create(req.body, (err, data) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(201).send(data)
                }
            })
        }))
    })
});

module.exports=router
