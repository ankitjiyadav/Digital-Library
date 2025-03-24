const { body, validationResult } = require("express-validator");

const adminValidation = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long")
        .isLength({ max: 10 }).withMessage("name lase then 10 character")
        .matches(/^[A-Za-z\s]+$/).withMessage("Name should only contain letters and spaces"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@$!%*?&)"),
    body("id")
        .notEmpty().withMessage("id is required")
        .isLength({ min: 12, max: 12 }).withMessage("Please enter a correct aadhar number")
        .matches(/[0-9]/).withMessage("Aadhar number must be require Number"),
    body('pincode')
        .notEmpty().withMessage("Pincode is required")
        .isLength({ min: 6, max: 6 }).withMessage("Pincode must be exactly 6 digits")
        .isNumeric().withMessage("Pincode must contain only numbers"),
    body('address')
        .notEmpty().withMessage("Address is required")
        .isLength({ min: 10 }).withMessage("Address must be at least 10 characters long")
        .matches(/^[a-zA-Z0-9\s,.'-]{10,}$/).withMessage("Address contains invalid characters"),
        body('city')
        .notEmpty().withMessage("City is required")
        .isLength({ min: 3 }).withMessage("City must be at least 3 characters long")
        .matches(/^[a-zA-Z\s,.'-]+$/).withMessage("City contains invalid characters"),
    
    (req, res, next) => {
          console.log(req.body);
        //   return

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array().map(err => err.msg) });
        }
        next();
    }
];

module.exports = { adminValidation };
