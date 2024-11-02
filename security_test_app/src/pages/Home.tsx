import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "../styles/Home.css";

export function Home() {
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
