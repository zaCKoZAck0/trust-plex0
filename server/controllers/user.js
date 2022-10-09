require("dotenv/config");

const bcrypt = require("bcrypt");
const PlexUser = require("../models/User");
const jwt = require("jsonwebtoken");
// const refreshTokens = require("../models/refreshTokens")

const userLogin = async (request, response) => {
  try {
    const user = await PlexUser.findOne({ email: request.body.email });
    if (user === null) {
      response.status(200).json({ error: "User Not Found" });
    }
    else if (await bcrypt.compare(request.body.password, user.password)) {
      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      response
        .status(200)
        .json({
          message: "Login Sucessfull",
          accessToken: accessToken,
          user: user,
        });
    } else {
      response.status(200).json({ error: "Wrong Password" });
    }
  } catch (err) {
    response.status(500).json({ error: err });
  }
};

const userSignup = async function (request, response) {
  console.log("signup")
  try {
    if (await PlexUser.findOne({ email: request.body.email }))
      response.status(200).json({ error: "User Already Exists" });
    else {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(request.body.password, salt);
      const user = new PlexUser({
        name: request.body.name,
        email: request.body.email,
        password: hashPassword,
        genre: request.body.genre
      });
      await user.save();
      userLogin(request, response);
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: err });
  }
};

module.exports = { userLogin, userSignup };
