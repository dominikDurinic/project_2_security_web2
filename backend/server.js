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
server.use(express.json());

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

const checkRole = (req, allowedRole) => {
  const token = req.headers.authorization.split(" ")[1];

  const decodedToken = jwt.decode(token);

  const roles = decodedToken[process.env.RULE_NAMESPACE + "roles"];

  //provjera je li prijavljeni korisnik ima dopustenu ulogu za pristup
  if (roles.includes(allowedRole)) {
    return true;
  } else {
    return false;
  }
};

server.get("/", (req, res) => {
  res.send("Hello from the public endpoint!");
});

server.post("/protected", checkJwt, (req, res) => {
  const vulnerability = req.body;

  const roleCheck = checkRole(req, "admin");

  const data = { role: "You have admin access!" };

  if (vulnerability.vule) {
    //ako je ranjiva app onda nema provjere ovlasti
    return res.send(data);
  }

  if (roleCheck) {
    return res.send(data);
  }

  return res.status(403).send("Forbidden: You do not have the required role");
});

server.listen(port);
