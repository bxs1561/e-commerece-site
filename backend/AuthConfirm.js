const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/User")

function password(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=> {
        User.findOne({email: email})
            .then(user=>{
                if(!user){
                    return done(null,false, {
                        message: "email is not register"
                    })
                }

                //password match
                bcrypt.compare(password,user.password,(err,match)=>{
                    if(err){
                        throw err
                        if(match){
                            return done(null, user)
                        }
                        else {
                            return  done(null, false,{
                                message: "Password is incorrect"
                            })
                        }
                    }
                })
            }).catch(error=>console.log(error))

    }))
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

}
module.exports = password
