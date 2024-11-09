import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import { Home } from "./Home";
import { Login } from "./Login";
import { Menu } from "./Menu";
import { Vulnerability } from "./Vulnerability";
import { useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import VuleContext from "../../context/VuleContext";
import { AllStudents } from "./AllStudents";
import { Student } from "./Student";

function App() {
  const changeUsername = (newUser: string) => {
    //funkcija za promjenu konteksta ProfileContext od child komponenta
    setUsername(() => ({
      username: newUser,
      changeUsername,
    }));
  };

  const changeVule = (newVule: boolean) => {
    //funkcija za promjenu konteksta ProfileContext od child komponenta
    setVule(() => ({
      vule: newVule,
      changeVule,
    }));
  };

  const [username, setUsername] = useState({
    username: localStorage.getItem("username") || "",
    changeUsername,
  });

  const [vule, setVule] = useState({
    vule: Boolean(localStorage.getItem("vule")) || false,
    changeVule,
  });

  return (
    <>
      <ProfileContext.Provider value={username}>
        <VuleContext.Provider value={vule}>
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
                <Route
                  path="ednevnik/admin/allstudents"
                  element={<AllStudents />}
                />
                <Route
                  path="ednevnik/admin/student/:id"
                  element={<Student />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </VuleContext.Provider>
      </ProfileContext.Provider>
    </>
  );
}

export default App;
