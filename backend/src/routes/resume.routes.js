const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage(); // store in memory (important)
const upload = multer({ storage });

const {resumeUpdateController, resumeGetController} = require("../controllers/resume.controller")

router.get("/all", resumeGetController);

// router.get("/:id", resumeGetControllerUsingId);

router.post("/all", upload.single("file"), resumeUpdateController);

router.get("/", (req, res) => {
  res.send("Hello from resume API");
});

module.exports = router;