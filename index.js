require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./models");

const PORT =process.env.PORT||8081;
const errorHandler = require('./handlers/error')
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");

const {loginRequired, ensureCorrectUser}= require("./middleware/auth");
app.use(cors());
app.use(bodyParser.json());

//all my routes here - they will come later!

app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages",
loginRequired, 
ensureCorrectUser,
messageRoutes);

app.get("/api/messages", loginRequired, async function(req,res,next){
    try{
let messages = await db.Message.find()
.sort({createdAt: "desc"})
.populate("user",{
    username :true,
    profileImageUrl :true
});
return res.status(200).json(messages)
    }catch(err){
        return next(err)
    }
})

app.use(function(req,res,next){
    let err = new Error('Not Found');
    err.status=404;
    next(err)
});

app.use(errorHandler);

app.listen(PORT||8081, ()=>{ console.log(`Server is starting on port ${PORT}`)})