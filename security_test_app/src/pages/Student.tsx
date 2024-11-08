import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import { Navigate, useParams } from "react-router-dom";
import { HeaderEdnevnik } from "../components/HeaderEdnevnik";
import "../styles/Student.css";

interface Student {
  name: string;
  student_id: number;
  heShe: string;
  school: string;
}

interface Subject {
  name: string;
  grade: number;
}

export function Student() {
  const profile = useContext(ProfileContext);

  const { id } = useParams();

  const stud: Student = {
    name: "Dominik Đurinić",
    student_id: Number(id) || 1,
    heShe: "m",
    school: 'X.gimnazija "Ivan Supek"',
  };

  const subj: Subject[] = [
    { name: "Matematika", grade: 5 },
    { name: "Fizika", grade: 4 },
    { name: "Povijest", grade: 4 },
    { name: "Informatika", grade: 5 },
  ];

  if (profile.username === "") {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <HeaderEdnevnik />
      <div className="student-main-container">
        <div className="back-btn-div">
          <a href="http://localhost:5173/ednevnik/admin/allstudents">
            <button>{"< "}Povratak na listu učenika</button>
          </a>
        </div>
        <div className="student-container">
          <img
            src={stud.heShe === "f" ? "/images/f.png" : "/images/m.png"}
            alt="logo-stud"
            width="100px"
          />
          <div className="student-info-div">
            <h1>{stud.name}</h1>
            <h3>id:{stud.student_id}</h3>
            <p>{stud.school}</p>
          </div>
        </div>

        <div className="table-div">
          <table className="grades-table">
            <tr>
              <th>Predmet</th>
              <th>Ocjena</th>
            </tr>
            {subj.map((data) => (
              <tr key={data.name}>
                <td className="bold-text">{data.name}</td>
                <td className="grades-td">{data.grade}</td>
              </tr>
            ))}
            <tr>
              <td className="grades-td">Prosjek ocjena:</td>
              <td className="grades-td bold-text">4.89</td>
            </tr>
          </table>
        </div>
        <div className="btn-div">
          <button className="btn-ednevnik">UREDI</button>
          <button className="btn-ednevnik delete-btn">IZBRIŠI</button>
        </div>
      </div>
    </>
  );
}
