const MovieCache = require("../models/MovieCache");
const { getPopularMoviesByGenre, getAllPopularMovies, getMovieById } = require("./movie");
const { getMovieDetails } = require("./movieUtil");
const axios = require("axios")

const chechImageCache = async () => {
  let moviecache = await MovieCache.findOne({ name: "allImagesCache" });
  if (moviecache) {
    getAllPopularMovies()
      .then(async (array) => {
        console.log(array)
        const posters = []
        array.data.forEach(ele=>{
            const id = ele.split("/")[2]
            let options = {
              method: "GET",
              url: `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=full`,
            };
            axios
            .request(options)
            .then(res => res.data.json())
            .then((result) => {
              posters.push(result.data.Poster)
      })
    })

    console.log(posters)

    const newMovieCache = new MovieCache({
      name: "allImagesCache",
      movies: posters,
    });
    moviecache = await newMovieCache.save();

      })
      .catch((error) => {
        console.log(error);
      });
}}

const checkCache = async () => {
  let moviecache = await MovieCache.findOne({ name: "all" });
  if (moviecache) {
    getAllPopularMovies()
      .then(async (array) => {
        const newMovieCache = new MovieCache({
          name: "all",
          movies: array,
        });
        moviecache = await newMovieCache.save();
      })
      .catch((error) => {
        console.log(error);
      });
    let otherMovieCache;

    ["action", "romance", "scifi", "comedy", "horror"].forEach((genre) => {
      getPopularMoviesByGenre(genre)
        .then(async (array) => {
          // let result = [];
          // console.log(array);
          otherMovieCache = new MovieCache({
            name: genre,
            movies: array,
          });
          await otherMovieCache.save();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  moviecache = await MovieCache.findOne({ name: "all" });
  const diffInMs = new Date(Date.now()) - new Date(moviecache.updatedAt);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  if (diffInDays > 7) {
    getAllPopularMovies()
      .then(async (array) => {
        const newMovieCache = new MovieCache({
          name: "all",
          movies: array,
        });
        moviecache = await newMovieCache.save();
      })
      .catch((error) => {
        console.log(error);
      });
    let otherMovieCache;

    ["action", "romance", "scifi", "comedy", "horror"].forEach((genre) => {
      getPopularMoviesByGenre(genre)
        .then(async (array) => {
          // let result = [];
          // console.log(array);
          otherMovieCache = new MovieCache({
            name: genre,
            movies: array,
          });
          await otherMovieCache.save();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
};

module.exports = {
  checkCache, chechImageCache
};
