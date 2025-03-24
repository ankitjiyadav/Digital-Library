const mongoose = require('mongoose');
const db=require('../config/dbConnection');
// const sellerModel=require('../models/sellerModel');
require('../models/sellerModel')
// const se

const condidate_Model = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    libraryName: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Foreign Key
        ref: "sellerDetail" // Reference to User Model
    },
    address: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require: true
    },
    idImage: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
})


module.exports=db.model("condidate",condidate_Model)

