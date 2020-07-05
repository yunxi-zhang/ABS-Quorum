var express = require("express");
var app = express(),
    port = 3002;
const buyer = require('./routes/buyer.js');

app.use('/buyer', buyer);
app.use(express.json());

app.listen(port, ()=> {
    console.log("server is running on port ", port);
})