const { body, validationResult } = require('express-validator');



const sellerValidation = [
    body("libraryName")
        .notEmpty().withMessage("libraryName is required")
        .isLength({ min: 3 }).withMessage("libraryName must be at least 3 characters long")
        .isLength({ max: 20 }).withMessage("libraryName lase then 10 character")
        .matches(/^[A-Za-z\s]+$/).withMessage("libraryName should only contain letters and spaces"),

    body("ownerName")
        .notEmpty().withMessage("Name is required")
        .isLength({ max: 20 }).withMessage("ownerName lase then 20 character")
        .matches(/^[A-Za-z\s]+$/).withMessage("ownerName should only contain letters and spaces"),
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
    body("mobile")
        .trim() // Removes spaces
        .notEmpty().withMessage("Phone number is required")
        .isMobilePhone().withMessage("Invalid phone number format")
        .isLength({min:10,max:10}).withMessage("Invalid mobile number")
        .escape(), // Sanitizes input
        body("status")
        .notEmpty().withMessage("Status is required") // Ensure it's provided
        .isBoolean().withMessage("Status must be true or false") // Allow only true/false
        .toBoolean(),
        
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ status: 400, errors: errors.array().map(err => err.msg) });
        }
        next();
    }
];


module.exports = { sellerValidation };