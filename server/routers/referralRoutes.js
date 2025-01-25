const {Router} = require("express");
const { createReferral, updateReferralStatus, getReferrals } = require("../controllers/referralController");
const { multerUpload } = require("../config/cloudinaryConfig");

const referralRoute = Router();
referralRoute.post('/',multerUpload.single("resume"), createReferral);
referralRoute.put('/:id', updateReferralStatus);
referralRoute.get('/', getReferrals);

module.exports = referralRoute;