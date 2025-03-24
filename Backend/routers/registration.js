const express = require("express");
const router = express.Router();
const controller=require('../controllers/index')
const middlewares=require('../middlewares/index')
var bodyParser = require('body-parser')
const multer = require('multer');
const fs=require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = "./uploads/general"; // Default folder

        // Checking field name to determine folder
        if (file.fieldname === "image") {
            uploadPath = "./uploads/images";
        } else if (file.fieldname === "aadhar") {
            uploadPath = "./uploads/aadhar";
        }
        else if(file.fieldname==="idImage"){
            uploadPath='./uploads/student';
        }

        // Ensure the directory exists
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// Multer Instance for Multiple Files
const upload = multer({ storage: storage });
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//*****************   start Registration,login   **************//

router.post( "/registration", upload.fields([{ name: "image", maxCount: 1 },{ name: "aadhar", maxCount: 1 }]),
    middlewares.adminMiddlerware.adminValidation,controller.adminController.adminRegistration
);
router.post("/login",controller.adminController.login);
router.post("/send/otp",controller.adminController.generateOtp);
router.post("/otp/verify",upload.none(),controller.adminController.otpVerify);

// ******************** End ******************  //

//****************detail featch************* *//
  router.get("/all/vender",controller.adminController.all_vender);
  

//********************End*****************/



router.post("/auth/ckeck",upload.none(),middlewares.authValidation.verify_token,(req,res)=>{
    return res.send({message:"Token have verify___"});
});

// ************** seller  start *****************//

router.post("/seller/detail/add",upload.none(),middlewares.authValidation.verify_token,middlewares.seller.sellerValidation,controller.sellerController.seller_detail_add);
router.get("/seller/allDetail",middlewares.authValidation.verify_token, controller.sellerController.sellerAllDetail);
router.put('/saller/detail/edit:id',upload.none(),middlewares.authValidation.verify_token,controller.sellerController.seller_edit);
router.delete('/saller/detail/delete:id',middlewares.authValidation.verify_token,controller.sellerController.seller_delete);

// *************** End **********************//

//***************condidate start***************//
router.post("/candidate/detail/add",upload.fields([{ name: "idImage", maxCount: 1 }]),middlewares.authValidation.verify_token,
middlewares.condidateMiddlerware.condidateValidation,controller.condidateController.condidate_detail_add);
router.get('/all/candidate/detail',middlewares.authValidation.verify_token,controller.condidateController.all_condidate_detail)
router.put('/candidate/edit:id',upload.fields([{ name: "idImage", maxCount: 1 }]),
controller.condidateController.edit_candidate);

// router.get("/candidate/check",upload.none(),controller.condidateController.condidate_check)

module.exports = router;
