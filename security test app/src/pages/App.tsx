import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import { Home } from "./Home";
import { Login } from "./Login";
import { Menu } from "./Menu";
import { Vulnerability } from "./Vulnerability";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="menu" element={<Menu />} />
            <Route
              path="vulnerability/xss"
              element={<Vulnerability id={1} />}
            />
            <Route
              path="vulnerability/bac"
              element={<Vulnerability id={2} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
