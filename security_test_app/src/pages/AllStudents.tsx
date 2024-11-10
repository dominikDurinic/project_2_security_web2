import { useContext, useEffect, useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { HeaderEdnevnik } from "../components/HeaderEdnevnik";
import { EdnevnikItem } from "../components/EdnevnikItem";
import { useAuth0 } from "@auth0/auth0-react";

interface Student {
  name: string;
  student_id: number;
  heshe: string;
  school: string;
}

export function AllStudents() {
  const profile = useContext(ProfileContext);
  let vule;
  if (localStorage.getItem("vule") === "false") {
    vule = false;
  } else {
    vule = true;
  }
  const [response, setResponse] = useState<string>("");
  const [listOfStudents, setListOfStudents] = useState<Student[]>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (profile.username === "") {
      navigate("/login");
    }
    const getStudents = async () => {
      try {
        const token = await getAccessTokenSilently();
        const resp = await fetch(
          "https://hackatest-backend.onrender.com/allstudents",
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
          throw new Error(resp.status + " " + resp.text);
        } else {
          const data = await resp.json();

          setListOfStudents(data.rows);
        }
      } catch (error) {
        setResponse("" + error);
        console.error("Error fetching protected data:", error);
        setLoading(false);
      }
      setLoading(false);
    };
    getStudents();
  }, []);

  return (
    <>
      <HeaderEdnevnik />
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {response !== "" ? (
            <h3>{response}</h3>
          ) : (
            <>
              <div className="ednevnikList-div">
                <h2>Lista učenika</h2>
                <p>Ukupno: {listOfStudents?.length}</p>
              </div>

              {listOfStudents?.map((student, index) => (
                <EdnevnikItem
                  key={student.student_id}
                  name={student.name}
                  heShe={student.heshe}
                  student_id={student.student_id}
                  index={index + 1}
                />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
