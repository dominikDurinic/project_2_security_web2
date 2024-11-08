import { useState } from "react";
//import { useAuth0 } from "@auth0/auth0-react";

export function Bac(props: { vule: boolean }) {
  const [msg, setMsg] = useState<string>("");
  //const [response, setResponse] = useState<string>("");
  /*
  const { getAccessTokenSilently } = useAuth0();

  const getData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const resp = await fetch("http://localhost:8000/protected", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vule: props.vule }),
      });
      if (!resp.ok) {
        throw new Error(resp.status + " " + resp.statusText);
      } else {
        const data = await resp.json();
        setResponse(data["role"]);
      }
    } catch (error) {
      setResponse("" + error);
      console.error("Error fetching protected data:", error);
    }
  };
  */

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
          placeholder="Unesite adresu za pretragu ..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className="btn-chat" onClick={() => window.open(msg)}>
          Pretraži
        </button>
      </div>
      <p>{response}</p>
    </>
  );
}
