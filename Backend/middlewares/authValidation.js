const express = require('express');
const jwt = require('jsonwebtoken');
const { key } = require('../util/secret');
const { ConnectionStates } = require('mongoose');


// console.log(key.secret_key)
const generate_token = (id, role) => {

    //  console.log("jwt function",id,role);

    const token = jwt.sign(
        { id, role },
        key.secret_key,
        { expiresIn: '1h' }
    );

    return token
}


const verify_token = async (req, res, next) => {
    try {
        const new_token = req.headers.authorization;
        //    console.log("token++",req);
        //    console.log("sir token+++".req.headers);
           console.log("token+___",new_token);
        //   return

        //              headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`, 
        //   },

        if (!new_token || !new_token.startsWith("Bearer ")) {
            return res.send({ status: 401, message: "No token povide" });
        }

        const token = new_token.split(" ")[1];
        //         console.log(token);
        //  return
        const result = await jwt.verify(token, key.secret_key);

        req.result = result;
        // console.log("result++",result)
        // console.log("req result",result)
        if (result) {
            // console.log("auth varify....");
            next();
        } else {
            return res.send({ status: 404, message: "Token expire or invalid" });
        }

    } catch (err) {
        return res.send({ status: 500, message: "Invalidat token" });
    }
}


module.exports = {
    generate_token,
    verify_token
}