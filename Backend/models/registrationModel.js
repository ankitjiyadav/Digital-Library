const mongoose=require('mongoose');
const { type } = require('os');
const db=require('../config/dbConnection');
const bcrypt=require('bcrypt');

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        unique:true,
        required:true
    },
    id:{
        type:Number,
        required:true,
    },
    role:{
        type:String,enum:["user","admin","library"],require:true
    },
    gender:{
        type:String,
        enum:["male","female","taransgender"],
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String
        // required:true
    },
    aadhar:{
        type:String
        // required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    }

})

adminSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next()
     
        try{
                const salt=await bcrypt.genSalt(10);
                this.password=await bcrypt.hash(this.password,salt);
                next();
        }catch(err){
            return next(err);
        }
})


module.exports=db.model("Admin",adminSchema);