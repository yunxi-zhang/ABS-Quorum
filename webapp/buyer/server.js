var express = require("express");
const dotenv = require('dotenv');
dotenv.config();
var app = express(),
    port = process.env.PORT || 443;
const buyer = require('./routes/buyer.js');

app.use('/buyer', buyer);
app.use(express.json());

app.listen(port, ()=> {
    console.log("server is running on port ", port);
})