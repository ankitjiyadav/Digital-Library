const mongoose=require('mongoose')
const db=require('../config/dbConnection');



const otpSchema=new mongoose.Schema({
    mobile:{
       type:String,
       required:true
    //    unique:true
    },
    otp:{
        type:String,
        // required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,expires:300   //expire 5 minites...
    }
});


module.exports=db.model("Otp",otpSchema);
