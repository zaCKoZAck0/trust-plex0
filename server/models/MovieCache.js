const mongoose = require("mongoose");

const MovieCacheSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  movies: {
    type: [String],
    required: true,
  }
},{ timestamps: true });

module.exports = mongoose.model("MovieCache", MovieCacheSchema);