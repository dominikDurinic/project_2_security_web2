import { useContext, useEffect, useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderEdnevnik } from "../components/HeaderEdnevnik";
import "../styles/Student.css";
import { useAuth0 } from "@auth0/auth0-react";

interface Student {
  name: string;
  student_id: number;
  heshe: string;
  school: string;
}

interface Subject {
  name: string;
  grade: number;
}

interface GradesAvg {
  avg: number;
}

export function Student() {
  const profile = useContext(ProfileContext);
  let vule;
  if (localStorage.getItem("vule") === "false") {
    vule = false;
  } else {
    vule = true;
  }

  const [response, setResponse] = useState<string>("");
  const [studentInfo, setStudentInfo] = useState<Student[]>();
  const [studentGrades, setStudentGrades] = useState<Subject[]>();
  const [gradesAvg, setGradesAvg] = useState<GradesAvg[]>();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (profile.username === "") {
      navigate("/login");
    }

    const getStudentInfo = async () => {
      try {
        const token = await getAccessTokenSilently();
        const resp = await fetch(
          `https://hackatest-backend.onrender.com/student/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ vule: vule }),
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status + " " + resp.statusText);
        } else {
          const data = await resp.json();

          setStudentInfo(data.rows);
        }
      } catch (error) {
        setResponse("" + error);
        console.error("Error fetching protected data:", error);
        setLoading(false);
      }
    };

    const getStudentGrades = async () => {
      try {
        const token = await getAccessTokenSilently();
        const resp = await fetch(
          `https://hackatest-backend.onrender.com/student/grades/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ vule: vule }),
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status + " " + resp.statusText);
        } else {
          const data = await resp.json();

          setStudentGrades(data.rows);
        }
      } catch (error) {
        setResponse("" + error);
        console.error("Error fetching protected data:", error);
        setLoading(false);
      }
    };

    const getGradesAvg = async () => {
      try {
        const token = await getAccessTokenSilently();
        const resp = await fetch(
          `https://hackatest-backend.onrender.com/student/grades/avg/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ vule: vule }),
          }
        );
        if (!resp.ok) {
          throw new Error(resp.status + " " + resp.statusText);
        } else {
          const data = await resp.json();

          setGradesAvg(data.rows);
        }
      } catch (error) {
        setResponse("" + error);
        console.error("Error fetching protected data:", error);
        setLoading(false);
      }
      setLoading(false);
    };

    getStudentInfo();
    getStudentGrades();
    getGradesAvg();
  }, []);

  return (
    <>
      <HeaderEdnevnik />

      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {response !== "" || loading ? (
            <h3>{response}</h3>
          ) : (
            <div className="student-main-container">
              <div className="back-btn-div">
                <a href="http://localhost:5173/ednevnik/admin/allstudents">
                  <button>{"< "}Povratak na listu učenika</button>
                </a>
              </div>
              <div className="student-container">
                <img
                  src={
                    studentInfo && studentInfo[0].heshe === "f"
                      ? "/images/f.png"
                      : "/images/m.png"
                  }
                  alt="logo-stud"
                  width="100px"
                />
                <div className="student-info-div">
                  <h1>{studentInfo && studentInfo[0].name}</h1>
                  <h3>[ID: {studentInfo && studentInfo[0].student_id}]</h3>
                  <p>{studentInfo && studentInfo[0].school}</p>
                </div>
              </div>

              <div className="table-div">
                <table className="grades-table">
                  <tr>
                    <th>Predmet</th>
                    <th>Ocjena</th>
                  </tr>
                  {studentGrades &&
                    studentGrades.map((subject) => (
                      <tr key={subject.name}>
                        <td className="bold-text">{subject.name}</td>
                        <td className="grades-td">{subject.grade}</td>
                      </tr>
                    ))}
                  <tr>
                    <td className="grades-td">Prosjek ocjena:</td>
                    <td className="grades-td bold-text">
                      {gradesAvg && gradesAvg[0].avg}
                    </td>
                  </tr>
                </table>
              </div>
              <div className="btn-div">
                <button className="btn-ednevnik">UREDI</button>
                <button className="btn-ednevnik delete-btn">IZBRIŠI</button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
