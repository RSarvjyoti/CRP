const {Schema, model} = require("mongoose");

const referralSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: String, required: true },
  resume: { type: String, required: true },
  status: { type: String, enum: ["New", "Evaluated", "Hired", "Rejected"], default: "New" },
});

const Referral = model("Referral", referralSchema);

module.exports = Referral;