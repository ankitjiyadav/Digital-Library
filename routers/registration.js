const express = require("express");
const router = express.Router();
const controller=require('../controllers/index')
const middlewares=require('../middlewares/index')

// https://github.com/ankitjiyadav/Digital-Library.git
// https://github.com/ankitjiyadav/Digital-Library
// middlewares.adminMiddlerware.adminValidation,
console.log("constroller",controller);
router.get("/chek", (req, res) => {
    console.log("API check....");
    res.send("API is working!"); 
});

router.post("/registration", controller.adminController.adminRegistration);


module.exports = router;
