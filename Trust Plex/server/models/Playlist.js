const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PlaylistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  movies: {
    type: [String],
    default: [],
    required: true,
  },
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
