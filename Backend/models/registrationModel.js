const mongoose=require('mongoose');
const { type } = require('os');
const db=require('../config/dbConnection');
// const bcrypt=require('bcryptjs');

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    id:{
        type:String,
        require:true,
        enum:["aadhar"],
        default:"aadhar"
    },
    role:{
        type:String,enum:["user","admin","library"],require:true
    },
})

// adminSchema.pre('save',async function (next) {
//     if(!this.isModified('password')) return next()
     
//         try{
//                 const salt
//         }catch(err){

//         }
// })


module.exports=db.model("Admin",adminSchema);