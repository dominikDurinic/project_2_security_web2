//import { useContext, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "../styles/Login.css";
//import ProfileContext from "../../context/ProfileContext";
import { useAuth0 } from "@auth0/auth0-react";

export function Login() {
  /*const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  const profile = useContext(ProfileContext);
*/
  const { loginWithRedirect } = useAuth0();

  /*function checkLogin(username: string, password: string) {
    if (username === "admin" && password === "attackMe123") {
      setIncorrect(false);
      profile.changeUsername(username);
      localStorage.setItem("username", username);
      return true;
    } else {
      setIncorrect(true);
      setUsername("");
      setPassword("");
      return false;
    }
  }*/

  return (
    <>
      <Header selected={3} />
      <main>
        <div className="login-div">
          <div className="login-container">
            <img src="/images/logo3.png" alt="logo" width={"50px"} />
            <h3>Prijava</h3>
            <p className="test-msg">
              Podaci za prijavu - <br /> e-pošta:{" "}
              <span className="italic-text bold-text">admin@fer.hr</span>,
              lozinka:{" "}
              <span className="italic-text bold-text">attackMe123</span>
            </p>
            {/*
            {incorrect && (
              <p className="warning-msg">
                Pogrešno korisničko ime ili lozinka.
              </p>
            )}
            <form className="login-form">
              <label htmlFor="user" className="bold-text">
                Korisničko ime:
              </label>
              <input
                type="text"
                id="user"
                placeholder="Unesite korisničko ime"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <label htmlFor="pass" className="bold-text">
                Lozinka:
              </label>
              <input
                type="password"
                id="pass"
                placeholder="Unesite lozinku"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </form>
            
            
            <a
              href={incorrect ? "#" : "/"}
              onClick={() => checkLogin(username, password)}
            >
              */}
            <button className="btn-login" onClick={() => loginWithRedirect()}>
              <img src="/images/auth0_logo.png" width="90px" />
              Prijavi se.
            </button>
            {/*</a> */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
