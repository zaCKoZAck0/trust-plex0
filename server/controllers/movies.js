const {
  getAllPopularMovies,
  getPopularMoviesByGenre,
  getMovieById,
} = require("../utils/movie");
const MovieCache = require('../models/MovieCache')

const getById = (request, response) => {
  getMovieById(request.params.id)
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((error) => {
      response.status(500).json(error);
    });
};

const getPopular = (request, response) => {
  getAllPopularMovies()
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((error) => {
      response.status(500).json(error);
    });
};

const getPopularCache = async (request,response)=>{
  const cachedMovies = await MovieCache.findOne({name:"all"})
  response.status(200).json(cachedMovies.movies)
}

const getPopularByGenreCache = async (request,response)=>{
  const cachedMovies = await MovieCache.findOne({name:request.params.genre})
  response.status(200).json(cachedMovies.movies)
}

const getPopularByGenre = (request, response) => {
  getPopularMoviesByGenre(request.params.genre)
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((error) => {
      response.status(500).json(error);
    });
};

module.exports = { getById, getPopular, getPopularByGenre, getPopularByGenreCache, getPopularCache };
