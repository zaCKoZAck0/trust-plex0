const mongoose = require("mongoose");

const PlexUserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  genre: {
    type: [String]
  }
});

module.exports = mongoose.model("PlexUser", PlexUserSchema);
