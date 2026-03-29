const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const uploadImage = require("../service/storage.service"); // your imagekit file
const background = require("../model/background.model");

const generateLocalUser = (req, res) => {
    const user = {
        id: uuidv4(),
        name: 'Local User',
    };
    
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token });
}



const saveBackground = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const expiresAt = new Date(decoded.exp * 1000);

    // Convert buffer to base64 for ImageKit
    const fileBuffer = req.file.buffer;
    const fileName = `bg_${decoded.id}_${Date.now()}.jpg`;

    const uploaded = await uploadImage(fileBuffer.toString("base64"), fileName);

    const imageUrl = uploaded.url;

    await background.findOneAndUpdate(
      { userId: decoded.id },
      {
        backgroundImage: imageUrl,
        expiresAt: expiresAt
      },
      { upsert: true }
    );

    res.json({ imageUrl });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

const getBackground = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const settings = await background.findOne({ userId: decoded.id });

  res.json({ background: settings?.backgroundImage || null });
};

const saveBackgroundPreset = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { url, name } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const expiresAt = new Date(decoded.exp * 1000);

    await background.findOneAndUpdate(
      { userId: decoded.id },
      {
        backgroundImage: url,
        backgroundName: name || 'Custom',
        expiresAt: expiresAt
      },
      { upsert: true }
    );

    res.json({ url, message: "Background preset saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save background preset" });
  }
};

module.exports = {
    generateLocalUser,
    saveBackground,
    getBackground,
    saveBackgroundPreset
};