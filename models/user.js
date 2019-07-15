const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
    },
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    }]
})

userSchema.pre("save", async function(next){
    try{
            let hashedPassword = await bcrypt.hashSync(this.password, 10);
            this.password = hashedPassword;
            return next();
        
    }catch(err){
        return next(err)
    }
})

userSchema.methods.comparePassword = async function(candidatePassword, next){
    console.log(candidatePassword)
    try{
        let isMatch = await bcrypt.compareSync(candidatePassword,this.password);
        console.log(isMatch, this.password)
        return isMatch;
    }catch(err){
        return next(err)
    }
}
const User = mongoose.model("User", userSchema);

module.exports = User;