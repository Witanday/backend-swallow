require('dotenv').config()
const mongoose = require('mongoose');
mongoose.set("debug",true);
mongoose.Promise;
//mongoose.connect("mongodb://localhost/warbler",{
mongoose.connect(process.env.DB,{
   
});

module.exports.User = require("./user");
module.exports.Message = require("./message");