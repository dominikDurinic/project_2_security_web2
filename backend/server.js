const express = require("express");
const server = express();
const { auth } = require("express-oauth2-jwt-bearer");
const jwt = require("jsonwebtoken");
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

server.use(checkJwt);

const checkRole = (req) => {
  const token = req.headers.authorization.split(" ")[1];

  const decodedToken = jwt.decode(token);

  const roles = decodedToken[process.env.RULE_NAMESPACE + "roles"];

  // Check if the user has a specific role (example)
  if (roles.includes("admin")) {
    return true;
  } else {
    return false;
  }
};

// Public route
server.get("/", (req, res) => {
  res.send("Hello from the public endpoint!");
});

// Protected route
server.get("/protected", checkJwt, (req, res) => {
  const roleCheck = checkRole(req);

  if (roleCheck) {
    return res.send("You have admin access!");
  }

  return res.status(403).send("Forbidden: You do not have the required role");
});

server.listen(port);
