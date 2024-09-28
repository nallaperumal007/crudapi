// pdfDetails.js
const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema({
  name: String,
  mobileNumber: String,
  location: String,
  email: String,
  skillSet: String,
  remarks: String,
  portfolio: String,
  address: String,
  type: String,
  techStack: String,
  resume: String
});

module.exports = mongoose.model("PdfDetails", PdfDetailsSchema);
