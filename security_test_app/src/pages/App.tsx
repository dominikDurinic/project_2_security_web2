import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import { Home } from "./Home";
import { Login } from "./Login";
import { Menu } from "./Menu";
import { Vulnerability } from "./Vulnerability";
import { useState } from "react";
import ProfileContext from "../../context/ProfileContext";
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

  const [username, setUsername] = useState({
    username: localStorage.getItem("username") || "",
    changeUsername,
  });

  return (
    <>
      <ProfileContext.Provider value={username}>
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
              <Route path="ednevnik/admin/student/:id" element={<Student />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProfileContext.Provider>
    </>
  );
}

export default App;
