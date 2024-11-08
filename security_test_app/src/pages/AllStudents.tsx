import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import { Navigate } from "react-router-dom";
import { HeaderEdnevnik } from "../components/HeaderEdnevnik";
import { EdnevnikItem } from "../components/EdnevnikItem";

export function AllStudents() {
  const profile = useContext(ProfileContext);

  if (profile.username === "") {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <HeaderEdnevnik />
      <div className="ednevnikList-div">
        <h2>Lista učenika</h2>
        <p>Ukupno: 2</p>
      </div>

      <EdnevnikItem name="Dominik Đurinić" heShe="m" student_id="8" index={1} />
      <EdnevnikItem
        name="Martina Pavlović"
        heShe="f"
        student_id="15"
        index={2}
      />
    </>
  );
}
