const express = require("express");
const {
  getAllPlaylist,
  getUserPlaylist,
  createPlaylist,
  addToPlayList,
  renamePlayList,
} = require("../controllers/playlist");
const auth = require("../utils/jwt");
const router = express.Router();

router.get("/getall/:user", auth, getUserPlaylist);
router.get("/getall", auth, getAllPlaylist);
router.post("/create", auth, createPlaylist);
router.put("/addmovie", auth, addToPlayList);
router.put("/rename", auth, renamePlayList);

module.exports = router;
