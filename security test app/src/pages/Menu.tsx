import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import data from "../../data/menu.json";
import { useState } from "react";
import { VulItem } from "../components/VulItem";
import "../styles/Menu.css";
import { VulCard } from "../components/VulCard";

interface VulData {
  id: string;
  name: string;
  srcImage: string;
  details: string;
}

export function Menu() {
  const newData: VulData[] = JSON.parse(JSON.stringify(data));
  const [click, setClick] = useState<boolean>(false);
  const [whoClick, setWhoClick] = useState<string>("");

  return (
    <>
      <Header selected={2} />
      <main>
        <h3>
          Izaberite 1 od {newData.length} ponuđene ranjivost te ispitajte njenu
          opasnost.
        </h3>
        <div className="menu-container">
          {newData.map((item) => (
            <div key={item.id}>
              <VulItem
                name={item.name}
                srcImg={item.srcImage}
                click={click}
                setClick={(clicked) => setClick(clicked)}
                whoClicked={whoClick}
                setWhoClicked={(who) => setWhoClick(who)}
              />
              {click && whoClick === item.name && (
                <VulCard details={item.details} />
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
