require("dotenv/config");
const axios = require("axios");

const hardData = {
  all: [
    "/title/tt13833688/",
    "/title/tt10648342/",
    "/title/tt10731256/",
    "/title/tt4593060/",
    "/title/tt3704428/",
    "/title/tt1745960/",
    "/title/tt10954984/",
    "/title/tt15083184/",
    "/title/tt15325794/",
    "/title/tt15791034/",
  ],
  comedy:[
    "/title/tt10648342/",
    "/title/tt4593060/",
    "/title/tt12593682/",
    "/title/tt13640696/",
    "/title/tt6710474/",
    "/title/tt13327038/",
    "/title/tt1596342/",
    "/title/tt8912936/",
    "/title/tt17076046/",
    "/title/tt15481952/"
  ],
  roamnce:[
    "/title/tt10648342/",
    "/title/tt1655389/",
    "/title/tt9198364/",
    "/title/tt1596342/",
    "/title/tt10168670/",
    "/title/tt5971474/",
    "/title/tt11909878/",
    "/title/tt1758830/",
    "/title/tt13320622/",
    "/title/tt14298328/"
  ],
  "sci-fi":[
    "/title/tt10648342/",
    "/title/tt10954984/",
    "/title/tt8041270/",
    "/title/tt6710474/",
    "/title/tt11866324/",
    "/title/tt5834426/",
    "/title/tt10872600/",
    "/title/tt6443346/",
    "/title/tt8912936/",
    "/title/tt1630029/"
  ],
  action:[
    "/title/tt10648342/",
    "/title/tt12593682/",
    "/title/tt1745960/",
    "/title/tt0092099/",
    "/title/tt6277462/",
    "/title/tt8041270/",
    "/title/tt13655328/",
    "/title/tt6710474/",
    "/title/tt11866324/",
    "/title/tt5834426/"
  ],
  horror:[
    "/title/tt15791034/",
    "/title/tt13560574/",
    "/title/tt10954984/",
    "/title/tt13223398/",
    "/title/tt11866324/",
    "/title/tt12873562/",
    "/title/tt11851548/",
    "/title/tt7144666/",
    "/title/tt10168670/",
    "/title/tt19623240/"
  ]
}

const getAllPopularMovies = () => {
  const options = {
    method: "GET",
    url: "https://online-movie-database.p.rapidapi.com/title/get-most-popular-movies",
    params: { currentCountry: "", purchaseCountry: "", homeCountry: "IN" },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject({ error: error });
      });
  });
};

const getPopularMoviesByGenre = (genre) => {
  const options = {
    method: "GET",
    url: "https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre",
    params: { genre: genre, limit: "10" },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };


  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject({ error: error });
      });
  });
};

const getMovieById = (id, choice = 0) => {
  let options = {
    method: "GET",
    url: `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=full`,
  };

  if (choice === 36)
    options = {
      method: "GET",
      url: "https://movie-database-alternative.p.rapidapi.com/",
      params: { r: "json", i: id },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
      },
    };

  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject({ error: error });
      });
  });
};

const searchMovie = async (request, response) => {
  const options = {
    method: "GET",
    url: `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${request.params.query}&plot=full`,
  };
  axios
    .request(options)
    .then(function (res) {
      response.status(200).json(res.data);
    })
    .catch(function (error) {
      response.status(500).json({ error: error });
    });
};

module.exports = {
  getAllPopularMovies,
  getPopularMoviesByGenre,
  getMovieById,
  searchMovie,
};
