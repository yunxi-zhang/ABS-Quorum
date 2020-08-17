var express = require("express");
const dotenv = require('dotenv');
dotenv.config();
var app = express(),
    port = process.env.PORT || 443;
const bank = require('./routes/bank.js');

app.use('/', bank);
app.use(express.json());

app.listen(port, ()=> {
    console.log("server is running on port ", port);
});