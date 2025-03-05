const express = require('express');
const adminModel = require('../models/registrationModel');
const { Admin } = require('mongodb');


  const adminRegistration=(req,res)=>{
         try{
               const body=req.body;
               console.log(body)  

         }catch(err){
            return res.send({status:500,message:err.message})
         }     
    
  }


module.exports = {
    adminRegistration,
}