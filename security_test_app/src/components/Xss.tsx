import { useContext, useEffect, useState } from "react";
import "../styles/Vulnerability.css";
import InnerHTML from "dangerously-set-html-content";
import ProfileContext from "../../context/ProfileContext";

export function Xss(props: { vule: boolean }) {
  const [msg, setMsg] = useState<string>("");
  const [msgList, setMsgList] = useState<string[]>([]);
  const [vuleReady, setVuleReady] = useState(false);

  const profile = useContext(ProfileContext);

  function sendMsg(value: string) {
    setMsgList(msgList.concat(value));
  }

  function validateInput(msg: string) {
    //provjera unosa - detektiranje html tagova u inputu
    const pattern = /<(.*)>/;
    const result = pattern.test(msg.toLowerCase());
    if (result) {
      return (
        '🚫 Syntax error - Cannot send html tags in message: "' + msg + '"'
      );
    } else {
      return msg;
    }
  }

  useEffect(() => {
    setMsgList([]);
    setVuleReady(props.vule);
  }, [props.vule]);

  return (
    <>
      <div className="input-div">
        <input
          placeholder="Enter your message..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button
          className="btn-chat"
          onClick={() => {
            if (!vuleReady) {
              const validatedMsg = validateInput(msg);
              sendMsg(validatedMsg);
            } else {
              sendMsg(msg);
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
                   <script>, <img> i dr. unutar kojih mozemo postaviti malicioznu scriptu*/}
              {vuleReady ? (
                <>
                  <InnerHTML html={msg} />
                  <p>{msg}</p>
                </>
              ) : (
                <p>{msg}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
