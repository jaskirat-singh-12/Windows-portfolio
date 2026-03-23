const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  resumeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const resume = mongoose.model("resume", resumeSchema);

module.exports = resume;
