const { uploadToCloudinary } = require("../config/cloudinaryConfig");
const Referral = require("../models/Referral");

const createReferral = async (req, res) => {
  try {
    const { name, email, experience, status } = req.body;
    const file = req.file;  

    if (!file) {
      return res.status(400).json({ message: "Resume is required" });
    }

    const result = await uploadToCloudinary(file);
    console.log(result); // Log the result of the upload to Cloudinary

    const newReferral = new Referral({
      name,
      email,
      experience,
      status,
      resume: result.secure_url,  
    });

    await newReferral.save();
    res.status(201).json({ message: "Referral created successfully", referral: newReferral });
  } catch (error) {
    console.error("Error creating referral:", error.message); 
    res.status(500).json({ message: "Error creating referral", error: error.message });
  }
};


const updateReferralStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const referralId = req.params.id;

    const referral = await Referral.findByIdAndUpdate(referralId, { status }, { new: true });

    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    res.status(200).json({ message: "Referral status updated successfully", referral });
  } catch (error) {
    console.error("Error updating referral status:", error);
    res.status(500).json({ message: "Failed to update referral status." });
  }
};

const getReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find();
    res.status(200).json(referrals);
  } catch (error) {
    console.error("Error fetching referrals:", error);
    res.status(500).json({ message: "Failed to fetch referrals." });
  }
};

module.exports = {
  createReferral,
  updateReferralStatus,
  getReferrals,
};