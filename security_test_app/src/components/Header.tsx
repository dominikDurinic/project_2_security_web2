import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import { useAuth0 } from "@auth0/auth0-react";

export function Header(props: { selected: number }) {
  const profile = useContext(ProfileContext);

  const { logout } = useAuth0();

  const logOutAll = () => {
    profile.changeUsername("");
    localStorage.setItem("username", "");
    logout({
      logoutParams: { returnTo: import.meta.env.VITE_REDIRECT_URI },
    });
  };

  return (
    <div className="header-container">
      <a href="/">
        <img src="/images/logo.png" alt="header-logo" width={"250px"} />
      </a>

      <div className="nav-bar">
        <a href="/">
          <h4 className={props.selected === 1 ? "selected-nav" : ""}>
            Početna
          </h4>
        </a>

        <a href="/menu">
          <h4 className={props.selected === 2 ? "selected-nav" : ""}>
            Izbornik
          </h4>
        </a>
        {profile.username ? (
          <a
            className="loggedUser"
            onClick={(e) => {
              e.preventDefault();
              logOutAll();
            }}
          >
            <h4>{profile.username}</h4>
            <p className="italic-text"> - Odjava</p>
          </a>
        ) : (
          <a href="/login">
            <h4 className={props.selected === 3 ? "selected-nav" : ""}>
              Prijava
            </h4>
          </a>
        )}
      </div>
    </div>
  );
}
