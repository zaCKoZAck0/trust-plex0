const { searchMovie } = require("../utils/movie");

const movieSearch = async (request, response) => {
  console.log(request.params.query)
  if (request.params.query) searchMovie(request, response);
  else response.status(200).json({});
};

module.exports = { movieSearch };
