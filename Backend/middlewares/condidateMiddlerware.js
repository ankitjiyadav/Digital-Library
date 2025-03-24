const { body, validationResult } = require('express-validator');



const condidateValidation = [
    body("name")
        .notEmpty().withMessage("libraryName is required")
        .isLength({ min: 3 }).withMessage("libraryName must be at least 3 characters long")
        .isLength({ max: 20 }).withMessage("libraryName lase then 10 character")
        .matches(/^[A-Za-z\s]+$/).withMessage("libraryName should only contain letters and spaces"),

    body("libraryName")
        .notEmpty().withMessage("libraryName is required")
        .isLength({ max: 20 }).withMessage("libraryName lase then 20 character")
        .matches(/^[A-Za-z\s]+$/).withMessage("libraryName should only contain letters and spaces"),
    body('id')
        .notEmpty().withMessage("id is required")
        .isLength({ min: 12, max: 12 }).withMessage("id must be exactly 12 digits")
        .isNumeric().withMessage("id must contain only numbers"),
    body('address')
        .notEmpty().withMessage("Address is required")
        .isLength({ min: 10 }).withMessage("Address must be at least 10 characters long")
        .matches(/^[a-zA-Z0-9\s,.'-]{10,}$/).withMessage("Address contains invalid characters"),
    body("mobile")
        .trim() // Removes spaces
        .notEmpty().withMessage("mobile number is required")
        .isMobilePhone().withMessage("mobile phone number format")
        .isLength({min:10,max:10}).withMessage("mobile mobile number")
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


module.exports = { condidateValidation };