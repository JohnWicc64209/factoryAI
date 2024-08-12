import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [scrollPos, setScrollPos] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollPos = window.scrollY;
      setScrollPos(newScrollPos);

      if (newScrollPos > 100 && stage === 0) {
        setStage(1);
      } else if (newScrollPos > 200 && stage === 1) {
        setStage(2);
      } else if (newScrollPos > 300 && stage === 2) {
        setStage(3);
      } else if (newScrollPos > 400 && stage === 3) {
        document.body.style.overflowY = "auto";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPos, stage]);

  return (
    <div className="container">
      <div className="box">
        <div
          className={`child-box ${stage > 0 ? "move" : ""} ${
            stage > 1 ? "final" : ""
          }`}
        ></div>
        <div
          className={`child-box ${stage > 0 ? "move" : ""} ${
            stage > 1 ? "final" : ""
          }`}
        ></div>
        <div
          className={`child-box ${stage > 1 ? "move" : ""} ${
            stage > 2 ? "final" : ""
          }`}
        ></div>
        <div
          className={`child-box ${stage > 1 ? "move" : ""} ${
            stage > 2 ? "final" : ""
          }`}
        ></div>
        <div
          className={`child-box ${stage > 1 ? "move" : ""} ${
            stage > 2 ? "final" : ""
          }`}
        ></div>
      </div>
    </div>
  );
}

export default App;
