const express = require("express");
const usersRouter = require("./routes/Users")
const addressRouter= require("./routes/AddressRoute")
const productRouter = require("./routes/ProductRoutes")
const paymentRouter = require("./routes/PaymentRoute")
const orderRouter = require("./routes/OrdersRoutes")
const mongoose = require("mongoose")
const cors = require('cors');

require('dotenv').config()

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
    useFindAndModify: false,
})
mongoose.connection.once("open",()=>{
    console.log("mongodb connected")
})


app.use('/users', usersRouter);
app.use("/user", addressRouter);
app.use("/product", productRouter);
app.use("/payment", paymentRouter)
app.use("/orders",orderRouter)

if(process.env.NODE_ENV==="production"){
    app.use(express.static('e-commerce-store/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'e-commerce-store','build','index.html'))
    })
}



app.listen(port,()=>console.log(`connecting to: ${port}`));
