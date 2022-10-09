const express = require("express");
const router = express.Router();
const {
  getById,
  getPopularByGenre,
  getPopular,
  getPopularByGenreCache, getPopularCache
} = require("../controllers/movies");

router.get("/:id", getById);

module.exports = router;
