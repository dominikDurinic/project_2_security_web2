export function VulItem(props: {
  srcImg: string;
  name: string;
  click: boolean;
  setClick: (clicked: boolean) => void;
  whoClicked: string;
  setWhoClicked: (clicked: string) => void;
}) {
  return (
    <div
      onClick={() => {
        if (props.whoClicked === props.name) {
          props.setClick(!props.click);
        } else {
          props.setClick(true);
        }

        props.setWhoClicked(props.name);
      }}
      className="vul-container"
    >
      <div className="vul-div">
        <img src={props.srcImg} alt="logo-vul" className="vul-icon" />
        <h3>{props.name}</h3>
      </div>
      <img
        src={
          props.click && props.whoClicked === props.name
            ? "/images/up.png"
            : "/images/down.png"
        }
        alt="up and down icon"
        width={"20px"}
        height={"20px"}
      />
    </div>
  );
}
