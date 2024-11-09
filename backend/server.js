const express = require("express");
const server = express();
const { auth } = require("express-oauth2-jwt-bearer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("../backend/db/index");

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

  console.log(roles);

  //provjera je li prijavljeni korisnik ima dopustenu ulogu za pristup
  if (roles.includes(allowedRole)) {
    return true;
  } else {
    return false;
  }
};

server.post("/allstudents", checkJwt, async (req, res) => {
  const vulnerability = req.body;

  const roleCheck = checkRole(req, "admin");

  const students = await db.query("SELECT * FROM student ORDER BY student_id");

  if (vulnerability.vule) {
    //ako je ranjiva app onda nema provjere ovlasti
    return res.send(students);
  }

  if (roleCheck) {
    return res.send(students);
  }

  return res.status(403).send("Forbidden: You do not have the required role");
});

server.post("/student/:id", checkJwt, async (req, res) => {
  const vulnerability = req.body;

  const roleCheck = checkRole(req, "admin");

  const studentInfo = await db.query(
    "SELECT * FROM student WHERE student_id = $1",
    [req.params.id]
  );

  if (vulnerability.vule) {
    //ako je ranjiva app onda nema provjere ovlasti
    return res.send(studentInfo);
  }

  if (roleCheck) {
    return res.send(studentInfo);
  }

  return res.status(403).send("Forbidden: You do not have the required role");
});

server.post("/student/grades/:id", checkJwt, async (req, res) => {
  const vulnerability = req.body;

  const roleCheck = checkRole(req, "admin");

  const studentGrades = await db.query(
    "SELECT subject.name, subject.grade FROM student JOIN subject ON student.student_id=subject.student_id WHERE student.student_id = $1",
    [req.params.id]
  );

  if (vulnerability.vule) {
    //ako je ranjiva app onda nema provjere ovlasti
    return res.send(studentGrades);
  }

  if (roleCheck) {
    return res.send(studentGrades);
  }

  return res.status(403).send("Forbidden: You do not have the required role");
});

server.post("/student/grades/avg/:id", checkJwt, async (req, res) => {
  const vulnerability = req.body;

  const roleCheck = checkRole(req, "admin");

  const studentGradesAvg = await db.query(
    "SELECT CAST(AVG(subject.grade) AS decimal(10,2)) AS avg FROM student JOIN subject ON student.student_id=subject.student_id WHERE student.student_id = $1",
    [req.params.id]
  );

  if (vulnerability.vule) {
    //ako je ranjiva app onda nema provjere ovlasti
    return res.send(studentGradesAvg);
  }

  if (roleCheck) {
    return res.send(studentGradesAvg);
  }

  return res.status(403).send("Forbidden: You do not have the required role");
});

server.listen(port);
