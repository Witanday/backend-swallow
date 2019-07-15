const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin= async function(req,res,next){
    //find user
   console.log(req.body.password)
    try{
    let foundUser= await db.User.findOne({
        email:req.body.email
    });
   
 console.log( foundUser)
    let isMatch =  await foundUser.comparePassword(req.body.password);
    console.log( 'isMatch',isMatch  )
    if(isMatch){
        let {id,username, profileImageUrl}= await foundUser;
        
        let token = jwt.sign({
            
                id,
                username,
                profileImageUrl
            },
            process.env.SECRET_KEY
            
        );
        next(res.status(200).json({
            id,
            username,
            profileImageUrl,
            token 
        }))
    }else{
        return next({
            status:400,
            message:"Invalid Email/Password."
        })
    }
}catch(err){
    return next({
        status:400,
        message:"Invalid Email."
    })
}
}

exports.signup = async function(req,res,next){
    console.log(req.body)
    try{
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl}= user;
        let token = jwt.sign(
            {
                id,
                username,
                profileImageUrl
            },
            process.env.SECRET_KEY
        );

        return res.status(200).json({
            id,
                username,
                profileImageUrl,
                token
        })
    }catch(err){
        //if validation fails

        if(err.code===11000){
            err.message ="Sorry, that username and/or email is taken "
        } 
        return next({
            status:400,
            message : err.message
        })
    }
}