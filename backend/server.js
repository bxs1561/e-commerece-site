const express = require("express");
const usersRouter = require("./routes/Users")
const addressRouter= require("./routes/AddressRoute")
const productRouter = require("./routes/ProductRoutes")
const mongoose = require("mongoose")
const cors = require('cors');
const session = require("express-session");
// const MongoStore= require("connect-mongo")(session);
const passport = require("passport");





require('dotenv').config();
// require("./AuthConfirm")(passport)
const app = express();

const port = process.env.PORT || 9000;
//middleware
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello")
})

//database
const connection_url = process.env.URI;
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.once("open",()=>{
    console.log("mongodb connected")
})
//express-session middleware
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({mongooseConnection: mongoose.connection})
// }));


//passport middleware
// app.use(passport.initialize());
// app.use(passport.session());



app.use('/users', usersRouter);
app.use("/user", addressRouter);
app.use("/product", productRouter);



app.listen(port,()=>console.log(`connecting to: ${port}`));
