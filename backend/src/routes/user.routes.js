const express = require('express');
const { generateLocalUser, saveBackground, getBackground, saveBackgroundPreset } = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage(); // store in memory for ImageKit
const upload = multer({ storage });

// console.log("object");

const publicWallpapers = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwc2NlbmVyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",

    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwc2NlbmVyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",

    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwc2NlbmVyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",

];

router.get("/guest", generateLocalUser);
router.post("/background", auth, upload.single("image"), saveBackground);
router.get("/background", auth, getBackground);
router.post("/background-preset", auth, saveBackgroundPreset);
router.get("/wallpapers", (req, res) => {  
  res.json(publicWallpapers);  
});

module.exports = router;