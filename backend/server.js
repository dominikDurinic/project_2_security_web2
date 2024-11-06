const express = require("express");
const server = express();
const { auth } = require("express-oauth2-jwt-bearer");
const jwksRsa = require("jwks-rsa");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 8000;

server.use(cors());

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

// Public route
server.get("/", (req, res) => {
  res.send("Hello from the public endpoint!");
});

// Protected route
server.get("/protected", checkJwt, (req, res) => {
  res.send("Hello from the protected endpoint!");
});

server.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    // Customize the response for JWT errors
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});

server.listen(port);
