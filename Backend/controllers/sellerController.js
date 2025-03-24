const express = require('express');
const venderModel = require('../models/sellerModel');
const { findOne } = require('../models/registrationModel');



const seller_detail_add = async (req, res) => {
    try {
        const { libraryName, ownerName, pincode, address, city, totalSite, mobile, status } = req.body;
            console.log("datata++++");
            // return;
        // const exData = await venderModel.findOne({ mobile });
        // if (exData) {
        //     return res.send({ status: 500, message: "User already exists" });
        // }
        const result = await venderModel.create({
            libraryName, ownerName, pincode, address, city, totalSite, mobile, status
        })
        if (result) {
            return res.send({ status: 200, message: "successfully" });
        } else {
            return res.send({ status: 500, message: "internal server errror" });
        }
    } catch (err) {
        return res.send({ status: 500, message: err.message });
    }
}


const sellerAllDetail = async (req, res) => {
    try {
        const result = await sellerModel.find({});
        return res.send({ status: 200, data: result });
    } catch (err) {
        return res.send({ status: 500, message: err.message });
    }
}

const seller_edit=async(req,res)=>{
    try{       
                const id=req.params.id;
                // console.log("a+++",id);
                // console.log(req.body);
                const{libraryName, ownerName, pincode, address, city, totalSite, mobile, status}=req.body;
                const result=await sellerModel.findByIdAndUpdate(id,{libraryName, ownerName,
                 pincode, address, city, totalSite, mobile, status});

                 console.log(result);
                if(!result){
                    return res.send({status:500,message:"Edit not successfully"});
                }else{
                    return res.send({status:200,message:"Data edit successfully"});
                }   
    }catch(err){
          return res.send({status:500,message:err.message});
    }
}


const seller_delete=async(req,res)=>{
    try{
        const id=req.params.id;
        console.log(id);
        const result=await sellerModel.findByIdAndDelete(id)
        console.log(result);
        if(result){
            return res.send({status:200,message:"Delete successfully"});
        }else{
            return res.send({status:500,message:"User not found"});
        }

    }catch(err){
        return res.send({status:200,message:err.message});
    }
}

module.exports = {
    seller_detail_add,
    sellerAllDetail,
    seller_edit,
    seller_delete,
}