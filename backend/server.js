const express = require("express");
const server = express();
const { auth } = require("express-oauth2-jwt-bearer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("../backend/db/index");

dotenv.config();

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

  //provjera je li prijavljeni korisnik ima dopustenu ulogu za pristup (pravo pristupa)
  if (roles.includes(allowedRole)) {
    return true;
  } else {
    return false;
  }
};

server.get("/", (req, res) => {
  return res.send("Welcome to HackaTest API.");
});

//dohvat liste svih ucenika
server.post("/allstudents", checkJwt, async (req, res) => {
  const vulnerability = req.body;

  const roleCheck = checkRole(req, "admin");

  if (vulnerability.vule || roleCheck) {
    //ako je ranjiva app onda nema provjere ovlasti, ako nije onda se provjerava ovlast korisnika
    const students = await db.query(
      "SELECT * FROM student ORDER BY student_id"
    );
    return res.send(students);
  }

  return res.status(403).send("Forbidden: You do not have the required role");
});

//dohvat info o uceniku s id
server.post("/student/:id", checkJwt, async (req, res) => {
  const vulnerability = req.body;

  const roleCheck = checkRole(req, "admin");

  if (vulnerability.vule || roleCheck) {
    //ako je ranjiva app onda nema provjere ovlasti, ako nije onda se provjerava ovlast korisnika
    const studentInfo = await db.query(
      "SELECT * FROM student WHERE student_id = $1",
      [req.params.id]
    );
    return res.send(studentInfo);
  }

  return res.status(403).send("Forbidden: You do not have the required role");
});

//dohvat ocjena ucenika s id
server.post("/student/grades/:id", checkJwt, async (req, res) => {
  const vulnerability = req.body;

  const roleCheck = checkRole(req, "admin");

  if (vulnerability.vule || roleCheck) {
    //ako je ranjiva app onda nema provjere ovlasti, ako nije onda se provjerava ovlast korisnika
    const studentGrades = await db.query(
      "SELECT subject.name, subject.grade FROM student JOIN subject ON student.student_id=subject.student_id WHERE student.student_id = $1",
      [req.params.id]
    );
    return res.send(studentGrades);
  }

  return res.status(403).send("Forbidden: You do not have the required role");
});

//dohvat prosjeka ocjena ucenika s id
server.post("/student/grades/avg/:id", checkJwt, async (req, res) => {
  const vulnerability = req.body;

  const roleCheck = checkRole(req, "admin");

  if (vulnerability.vule || roleCheck) {
    //ako je ranjiva app onda nema provjere ovlasti, ako nije onda se provjerava ovlast korisnika
    const studentGradesAvg = await db.query(
      "SELECT CAST(AVG(subject.grade) AS decimal(10,2)) AS avg FROM student JOIN subject ON student.student_id=subject.student_id WHERE student.student_id = $1",
      [req.params.id]
    );

    return res.send(studentGradesAvg);
  }

  return res.status(403).send("Forbidden: You do not have the required role");
});

const hostname = "0.0.0.0";
const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port =
  externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 8000;
server.listen(port, hostname);
