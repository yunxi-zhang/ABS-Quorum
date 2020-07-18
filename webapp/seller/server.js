var express = require("express");
var app = express(),
    port = 3003;
const seller = require('./routes/seller.js');

app.use('/seller', seller);
app.use(express.json());

app.listen(port, ()=> {
    console.log("server is running on port ", port);
})