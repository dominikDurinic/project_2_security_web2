import { useContext, useEffect, useState } from "react";
import "../styles/Vulnerability.css";
import InnerHTML from "dangerously-set-html-content";
import ProfileContext from "../../context/ProfileContext";
import VuleContext from "../../context/VuleContext";

export function Xss() {
  const [msg, setMsg] = useState<string>("");
  const [msgList, setMsgList] = useState<string[]>([]);
  const [sanitMsgList, setSanitMsgList] = useState<string[]>([]);
  const [vuleReady, setVuleReady] = useState(false);

  const profile = useContext(ProfileContext);
  const vule = useContext(VuleContext);

  function sanitization(char: string) {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "&":
        return "&amp;";
      case "\\":
        return "&#39;";
      case "/":
        return "&#x2F;";
      default:
        return char;
    }
  }

  function validateInput(msg: string) {
    //provjera unosa - detektiranje html tagova i sintakse u inputu, g - globalno
    const pattern = /[&<>"'\\/]/g;
    const result = pattern.test(msg.toLowerCase());
    if (result) {
      //ako su detektirani neki znakovi iz patterna onda je potrebna sanitizacija ulaza
      const sanitized_msg = msg.replace(pattern, (char) => sanitization(char));
      return [
        '🚫 Syntax error - Your input has been sanitized.<br/> Before: <br/>"' +
          sanitized_msg +
          '",<br/>After sanitization:<br/>',
        sanitized_msg,
      ];
    } else {
      //inace samo proslijedi na izlaz
      return [msg, ""];
    }
  }

  function sendMsg(value: string, valueSan: string) {
    setMsgList(msgList.concat(value));
    setSanitMsgList(sanitMsgList.concat(valueSan));
  }

  useEffect(() => {
    setMsgList([]);
    setVuleReady(vule.vule);
  }, [vule.vule]);

  return (
    <>
      <div className="input-div">
        <input
          className="input-msg"
          placeholder="Enter your message..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button
          className="btn-chat"
          onClick={() => {
            if (msg === "") {
              sendMsg(" ", "");
              setMsg("");
              return;
            }
            if (!vuleReady) {
              {
                /*Ako nema ranjivosti, onda ulaz odlazi na validaciju */
              }
              const validatedMsg = validateInput(msg);
              sendMsg(validatedMsg[0], validatedMsg[1]);
            } else {
              sendMsg(msg, "");
            }
            setMsg("");
          }}
        >
          Pošalji
        </button>
      </div>
      <div className="chat-box">
        <div className="coach-msg-div">
          <div className="msg-box msg-box-coach">
            <p>Pozdrav, {profile.username}! Kako se osjećaš danas?</p>
          </div>
        </div>
        {msgList.map((msg, index) => (
          <div className="me-msg-div" key={index}>
            <div className="msg-box msg-box-me">
              {/*<InnerHTML/> tj. dangerouslySetInnerHTML - prepoznaju se html tags iz string tipa i prevode,
                  navedeno nam omogucuje izvodenje xss vrste napada jer se ne provjeravaju tagovi
                   <script>, <img> i dr. unutar kojih mozemo postaviti malicioznu scriptu
                   Kako bismo sprijecili navedenu ranjivost sanitiziramo ulaz - input.*/}
              <InnerHTML html={msg} />
              {!vuleReady && <p>{sanitMsgList[index]}</p>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
