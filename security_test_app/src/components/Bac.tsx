import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export function Bac() {
  const [msg, setMsg] = useState<string>("");

  const { getAccessTokenSilently } = useAuth0();

  const getData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:8000/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };

  return (
    <>
      <div className="input-div search-div">
        <img
          className="deliteAll-cross"
          src="/images/cross.png"
          width="10px"
          onClick={() => setMsg("")}
        />
        <input
          className="input-url"
          placeholder="npr. http://localhost:5173/vulnerability/bac/admin/12"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className="btn-chat" onClick={getData}>
          Pretraži
        </button>
      </div>
    </>
  );
}
