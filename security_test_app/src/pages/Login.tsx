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
            <div className="test-msg">
              <p className="bold-text">Podaci za prijavu:</p>
              <p>
                e-pošta:{" "}
                <span className="italic-text bold-text">admin@fer.hr</span> ,
              </p>
              <p>
                lozinka:{" "}
                <span className="italic-text bold-text">attackMe123</span>
              </p>
              <p className="italic-text">
                (Za potrebe BAC ranjivosti koristite sljedeće podatke:
              </p>
              <p>
                e-pošta: <span className="italic-text">ucenik10@fer.hr</span> ,
              </p>
              <p>
                lozinka: <span className="italic-text ">loveSchool123</span> )
              </p>
            </div>
            <button className="btn-login" onClick={() => loginWithRedirect()}>
              <img src="/images/auth0_logo.png" width="90px" />
              Prijavi se.
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
