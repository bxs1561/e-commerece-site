const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {ensureAuth} = require("../Auth")


router.get("/protect",(req,res)=>{
    res.send("hello")
})
//get all the users
router.get("/",(req,res)=>{
    User.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    }).populate("user","name").sort({createdAt: "desc"})

});

router.post("/signin",(req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        res.status(500).json({error:"Please fill in the email or password"})
    }
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return res.status(500).json({error: "invalid email"})
    }
    else {

        User.findOne({email: email})
            .then(user => {
                if (!user) {
                    return res.status(500).json({error: "email does not exist "})
                }
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (match) {

                            const token = jwt.sign({_id: user._id}, "secretkey")
                            //give bavk token key
                            //send user id, name and email to front client
                            const{_id,name,email}= user
                            res.json({
                                token: token,
                                user: {_id,name,email}
                            });
                            // return res.status(201).json({message: "Succesfully sign in"})
                        } else {
                            // console.log(user)
                            return res.status(500).json({error: "invalid email or password"})
                        }


                })
            })
    }
})


//get user base on id
router.get("/:id",(req,res)=>{
    User.findById(req.params.id)
        .then(user=>res.status(500).send(user))
        .catch(err => res.status(400).json('Error: ' + err))
});


//user register
router.post("/register",(req,res)=>{
    const {email, name,password} = req.body
    if(!email || !name || !password){
        return res.status(500).json({error: "please fill in all the fields"})
    }
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return res.status(500).json({error: "invalid email"})
    }
    else {

        //if user exist
        User.findOne({email: email}).then(user => {
            if (user) {
                return res.status(500).json({error: "Email already exist"})
            }
            // const {name, email, password, password1, date} = req.body;
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
                req.body.password = hash
                User.create(req.body, (err, data) => {
                    if (err) {
                        return res.status(500).send(err)
                    } else {
                        return res.status(201).json({User: data})
                    }
                })
            }))
        })
    }
});

module.exports=router
