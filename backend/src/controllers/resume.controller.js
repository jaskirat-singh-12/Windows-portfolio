const mongoose = require("mongoose");
const resume = require("../model/resume.model");
const uploadImage = require("../service/storage.service");

const resumeUpdateController = async (req, res) => {
    try {
    const file = req.file;

    const response = await uploadImage(
        file.buffer, 
        file.originalname
    );

    const result = resume.create({
        resumeName: file.originalname,
        url: response.url
    })


    res.json({
      resumeName: result.resumeName,
      url: result.url
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const resumeGetController = async (req, res) => {
    try {
        const resumes = await resume.find();
        res.json(resumes);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    resumeUpdateController,
    resumeGetController
}