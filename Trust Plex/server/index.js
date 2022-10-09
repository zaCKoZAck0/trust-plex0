require("dotenv/config");

const userRoute = require("./routes/user");
const searchRoute = require("./routes/search");
const playlistRoute = require("./routes/playlist");
const moviesRoute = require("./routes/movies")
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const {checkCache, chechImageCache} = require("./utils/cache")

app.options(
  "*",
  cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 })
);

app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("**Mongoose is connected");
      // listen to port
      app.listen(process.env.PORT, () =>
        console.log(`*Express Running on PORT ${process.env.PORT} `)
      );
    }
  );
} catch (e) {
  console.log("Could Not Connect to Mongoose", e);
}



// ROUTES
app.use("/api/user", userRoute);
app.use("/api/search", searchRoute);
app.use("/api/playlist", playlistRoute);
app.use("/api/movies",moviesRoute)
