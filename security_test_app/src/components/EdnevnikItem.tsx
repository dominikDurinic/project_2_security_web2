export function EdnevnikItem(props: {
  name: string;
  heShe: string;
  student_id: number;
  index: number;
}) {
  return (
    <a
      className="ednevnik-a"
      href={`http://localhost:5173/ednevnik/admin/student/${props.student_id}`}
    >
      <div className="vul-container">
        <div className="vul-div">
          <h3>{props.index}.</h3>
          <img
            src={props.heShe === "f" ? "/images/f.png" : "/images/m.png"}
            alt="logo-stud"
            className="vul-icon"
          />
          <h3>{props.name}</h3>
        </div>
      </div>
    </a>
  );
}
