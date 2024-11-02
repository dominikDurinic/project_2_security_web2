export function VulCard(props: {
  shortName: string;
  details: string;
  literature: string;
}) {
  return (
    <div className="vulCard-container">
      <div className="btnDiv">
        <p className="bold-text">Detalji:</p>
        <a href={`/vulnerability/${props.shortName}`}>
          <button className="btn-vul-start">Ispitaj</button>
        </a>
      </div>
      <p>{props.details}</p>
      <p className="bold-text">Literatura:</p>
      <p className="italic-text">{props.literature}</p>
    </div>
  );
}
