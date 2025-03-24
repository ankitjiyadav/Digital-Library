const adminMiddlerware=require('./adminMiddlerware');
const authValidation=require('./authValidation');
const seller=require('./sellerMiddlerware');
const condidateMiddlerware=require('./condidateMiddlerware');

module.exports={
    adminMiddlerware,
    authValidation,
    seller,
    condidateMiddlerware
}