const mongoose = require('mongoose');

const backgroundSchema = new mongoose.Schema({
    userId: String,
  backgroundImage: String,
  expiresAt: {
    type: Date,
    expires: 7 * 24 * 60 * 60, // Expire after 7 days
    
  },   
  
});

const background = mongoose.model('background', backgroundSchema);

module.exports = background;