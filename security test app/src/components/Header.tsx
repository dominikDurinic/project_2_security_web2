export function Header(props: { selected: number }) {
  return (
    <div className="header-container">
      <a href="/">
        <img src="/images/logo.png" alt="header-logo" width={"250px"} />
      </a>

      <div className="nav-bar">
        <a href="/">
          <h3 className={props.selected === 1 ? "selected-nav" : ""}>
            Početna
          </h3>
        </a>

        <a href="/menu">
          <h3 className={props.selected === 2 ? "selected-nav" : ""}>
            Izbornik
          </h3>
        </a>

        <a href="/login">
          <h3 className={props.selected === 3 ? "selected-nav" : ""}>
            Prijava
          </h3>
        </a>
      </div>
    </div>
  );
}
