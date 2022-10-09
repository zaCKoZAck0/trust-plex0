const express = require("express");
const { movieSearch } = require("../controllers/search");
const auth = require("../utils/jwt");
const router = express.Router();

router.get("/:query", movieSearch);

module.exports = router;
