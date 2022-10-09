const Playlist = require("../models/Playlist");

const getAllPlaylist = async (request, response) => {
  try {
    const playlists = await Playlist.find({ isPrivate: false });
    response.status(200).json({ playlists: playlists });
  } catch (err) {
    response.status(500).json({ error: err });
  }
};

const getUserPlaylist = async (request, response) => {
  try {
    const playlists = await Playlist.find({ user: request.params.user });
    response.status(200).json({ playlists: playlists });
  } catch (err) {
    response.status(500).json({ error: err });
  }
};

const createPlaylist = async (request, response) => {
  try {
    const playlist = new Playlist({
      name: request.body.name,
      user: request.body.user,
      isPrivate: request.body.isPrivate,
      movies: [],
    });
    await playlist.save();
    response.status(201).json({
      message: "Playlist Created",
    });
  } catch (err) {
    response.status(500).json({ error: err });
  }
};

const addToPlayList = async (request, response) => {
  try {
    const playlist = await Playlist.findById(request.body._id);
    const movies = playlist.movies;
    if (movies.includes(request.body.movie))
      response.status(200).json({
        message: "Already Added",
      });
    else {
      movies.push(request.body.movie);
      await Playlist.updateOne(
        { _id: request.body._id },
        {
          $set: {
            movies: movies,
          },
        }
      );
      response.status(201).json({
        message: "Playlist Updated",
      });
    }
  } catch (err) {
    response.status(500).json({
      error: err,
    });
  }
};

const renamePlayList = async (request, response) => {
  try {
    await Playlist.updateOne(
      { _id: request.body._id },
      {
        $set: {
          name: request.body.name,
        },
      }
    );
    response.status(201).json({
      message: "Playlist Updated",
    });
  } catch (err) {
    response.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  getAllPlaylist,
  getUserPlaylist,
  createPlaylist,
  addToPlayList,
  renamePlayList,
};
