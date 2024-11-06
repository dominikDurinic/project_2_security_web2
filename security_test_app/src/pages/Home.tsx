import { useAuth0 } from "@auth0/auth0-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import "../styles/Home.css";
import { useEffect } from "react";

export function Home() {
  const profile = useContext(ProfileContext);

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (user && user.name) {
      profile.changeUsername(user?.name);
      localStorage.setItem("username", user?.name);
    }
  }, [isAuthenticated]);

  return (
    <>
      <Header selected={1} />
      <main>
        <div className="home-about">
          <img src="/images/logo2.png" alt="logo" width={"300px"} />
          <p>
            <span className="bold-text">HackaTest</span> je aplikacija koja Vam
            omogućuje ispitivanje različitih vrsta ranjivosti web aplikacija.
            Svrha ispitivanja je ukazivanje na potrebu za primjenom sigurnosnih
            mjera u izradi web aplikacija.
          </p>
          <a href="/menu">
            <button className="btn-home-start">Izbornik ranjivosti</button>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
