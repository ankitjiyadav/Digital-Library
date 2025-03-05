const express = require("express");
const router = express.Router();
const controller=require('../controllers/index')
const middlewares=require('../middlewares/index')

console.log("constroller",controller);
router.get("/chek", (req, res) => {
    console.log("API check....");
    res.send("API is working!"); 
});

router.post("/registration",middlewares.adminMiddlerware.adminValidation, controller.adminController.adminRegistration);


module.exports = router;
