const express = require('express');
const adminModel = require('../models/registrationModel');
const otpModel = require('../models/otpModel');
const { Admin } = require('mongodb');
const bcrypt = require("bcryptjs");
const axios = require("axios");
const jwt = require('../middlewares/index');
const generate_jwt_token = jwt.authValidation.generate_token
const key = require('../util/secret');
const venderModel=require('../models/sellerModel')
// generate_jwt_token() 

const adminRegistration = async (req, res) => {
    try {
        // console.log(req.body);
        // return
        const { name, email, password, id, role, mobile, gender, lastName, address, pincode, city } = req.body;
        const imagePath = req.files["image"] ? `/uploads/images/${req.files["image"][0].filename}` : null;
        const aadharPath = req.files["aadhar"] ? `/uploads/aadhar/${req.files["aadhar"][0].filename}` : null;
        //    console.log(req.body,{file:req.file?req.file:null});
        console.log("image path", imagePath);

        if (!name || !email || !password || !id || !role || !mobile || !gender || !lastName || !address || !pincode || !city) {
            return res.status(400).json({ status: 400, message: "All fields are required" });
        }

        const existingAdmin = await adminModel.findOne({ $or: [{ id }, { mobile }, { email }] });
        if (existingAdmin) {
            return res.status(400).json({ status: 400, message: "Record already exists" });
        }

        const newAdmin = await adminModel.create({
            name, password, email, id, role, mobile, gender,
            lastName, address, pincode, city,
            image: imagePath,
            aadhar: aadharPath
        });
        //    return;
        return res.status(201).json({ status: 200, message: "Registration successful", data: newAdmin });

    } catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return res.send({ status: 500, message: "Email and password  have required" })
        }
        else {
            const result = await adminModel.findOne({ email });
            if (!result) {
                return res.send({ status: 400, message: "Invalid email or password" });
            } else {

                if (result.role !== role) {
                    return res.send({ status: 500, message: "invalid email or password" })
                }
                const isPasswordValid = await bcrypt.compare(password, result.password);
                if (!isPasswordValid) {
                    return res.send({ status: 500, message: "Invalid email or password" })
                } else {

                    const token = await generate_jwt_token(result._id, result.role)
                    const mobile=result.mobile
                    const v_data=await venderModel.find({mobile});
                const { password, ...userData } = result.toObject(); 
                    return res.send({ status: 200, message: "Login Successfully", token: token,user:userData,venderData:v_data});
                }
            }

        }
    } catch (err) {
        return res.send({ status: 500, message: err.message });
    }
}


const generateOtp = async (req, res) => {
    try {
        const { mobile } = req.body;
        // console.log(mobile);
        //   return
        if (!mobile) {
            return res.send({ status: 500, message: "Mobile number is required" });
        }
        const userName = key.key.userName;
        const apikey = key.key.secret_key;
        if (!userName || !apikey) {
            return res.send({ status: 500, message: "SMS api credentials are missing" });
        }

        const otp = Math.floor(10000 + Math.random() * 90000);
        const message = ` Dear , Your One Time Login OTP for Online Exam is ${otp}. Do Not Share with anyone. SSVV, VARANASI	`;
        const smsApiUrl = `http://sms.aradhyatechnologies.in/sms-panel/api/http/index.php`;

        const response = await axios.get(smsApiUrl, {
            params: {
                username: "ssvv_online",
                apikey: "97971-6CEAF",
                apirequest: "Text",
                sender: "SSVVIN",
                mobile: mobile,
                message,
                route: "TRANS",
                TemplateID: "1707174082662785454",
                format: "JSON"
            }
        })

        if (response.data && response.data.status == "success") {
            const result = await otpModel.findOneAndUpdate(
                { mobile },  // Find by mobile number
                { otp },     // Update OTP field
                { new: true, upsert: true }  // Return updated doc & create if not exists
            );
            if (result) {
                return res.send({ status: 200, message: "OTP send successfully" });
            }
            else {
                return res.send({ status: 500, message: "some errors occured" });
            }
        }
    } catch (err) {
        return res.send({ status: 500, message: err.message });
    }
}

const otpVerify = async (req, res) => {
    try {
        const { mobile, otp } = req.body;
        //  return;
        if (!mobile || !otp) {
            return res.send({ status: 500, message: "Phone number and otp are require" })
        } else {
            const detail = await adminModel.findOne({ mobile });
            if (detail) {
                console.log(mobile);
                const user = await otpModel.findOne({ mobile });
                if (!user) {
                    return res.send({ status: 500, message: "Invalid or expire otp" });
                }
                if (user.otp !== otp || user.otpExpires < new Date()) {
                    return res.send({ status: 500, message: "Invalid or expire otp" });
                }
                user.otp = null;
                user.otpExpires = null;
                await user.save();
                const token = await generate_jwt_token(detail._id, detail.role)
                return res.send({ status: 200, message: "Login successful",token:token })
            }
            else{
                return res.send({status:500,message:"This user is not found"});
            }
        }

    } catch (err) {
        return res.send({ status: 500, message: err.message });
    }
}


const all_vender=async(req,res)=>{
    try{
         const result=await venderModel.find()
         if(result){
            return res.send({status:200,data:result});
         }else{
            return res.send({status:500,data:"vender not found"});
         }
    }catch(err){
        return res.send({status:500,data:err.message})
    }
}

module.exports = {
    adminRegistration,
    login,
    generateOtp,
    otpVerify,
    all_vender
}