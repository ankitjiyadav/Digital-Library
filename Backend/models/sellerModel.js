const mongoose = require('mongoose');
const db=require('../config/dbConnection');



const seller_sit_model = new mongoose.Schema({
    libraryName: {
        type: String,
        require: true
    },
    ownerName: {
        type: String,
    },
    pincode: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    totalSite: {
        type: Number,
        require: true
    },
    mobile: {
        type: Number,
        require: true
    },
    status:{
        type:Boolean,
        default:false
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

module.exports=db.model("venderDetail",seller_sit_model);