const express = require('express');
const adminModel = require('../models/registrationModel');
const { Admin } = require('mongodb');


  const adminRegistration=(req,res)=>{
         try{
              //  const body=req;
               console.log(req)  
                res.send({status:200,data:req.body})
         }catch(err){
            return res.send({status:500,message:err.message})
         }     
    
  }


module.exports = {
    adminRegistration,
}