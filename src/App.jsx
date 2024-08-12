import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [scrollAmount, setScrollAmount] = useState(0);
  const [oldBoxCompleted, setOldBoxCompleted] = useState(false);

  useEffect(() => {
    const handleWheel = (e) => {
      const scaledScroll = e.deltaY * 0.3;
      const newScrollAmount = Math.min(
        Math.max(scrollAmount + scaledScroll, 0),
        860
      );
      setScrollAmount(newScrollAmount);

      if (newScrollAmount >= 80 && !oldBoxCompleted) {
        setOldBoxCompleted(true);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrollAmount, oldBoxCompleted]);

  const mainBoxSize = 16;

  const boxPositions = [
    { left: 250, top: 0, title: "Executive Leadership" },
    { left: 330, top: 0, title: "Sales Department" },
    { left: 410, top: 0, title: "Marketing Team" },
    { left: 490, top: 0, title: "Data Department" },
    { left: 570, top: 0, title: "Development Department" },
    { left: 650, top: 0, title: "HR Department" },
    { left: 730, top: 0, title: "IT Department" },
  ];

  const initialBoxDistances = [
    { left: 55, right: 55, vertical: 50 },
    { left: 55, right: 55, vertical: 100 },
    { left: 55, right: 55, vertical: 150 },
    { left: 55, right: 55, vertical: 200 },
    { left: 55, right: 55, vertical: 250 },
    { left: 55, right: 55, vertical: 100 },
    { left: 55, right: 55, vertical: 50 },
  ];

  const customLeftTexts = [
    ["CEO", "CTO", "COO", "CFO", "Head of Sales"],
    ["Sales Director", "Sales Manager", "Sales Rep."],
    ["Marketing Specialist", "Content Writer", "SEO Expert"],
    ["Data Director", "Data Scientist", "Data Analyst", "Data Engineer"],
    [
      "Dev. Director",
      "JavaScript Team Lead",
      "Frontend Developer",
      "Backend Developer",
      "Full-Stack Developer",
      "Mobile Developer",
      "QA Engineer",
      "Python Team Lead",
      "Backend Developer",
      "AI/ML Engineer",
      "Data Engineer",
    ],
    ["HR Manager", "Recruit. Specialist", "HR Assistant"],
    ["IT Manager", "Network Admin", "System Admin"],
  ];

  const customRightTexts = [
    [
      "John Doe",
      "Jane Smith",
      "Michael Johnson",
      "Emily Davis",
      "William Brown",
    ],
    ["Anna Wilson", "Chris Taylor", "Jessica Martinez"],
    ["Kevin White", "Sarah Thompson", "Daniel Harris"],
    ["Laura Walker", "Brian Lewis", "Megan Robinson", "Anthony Lee"],
    [
      "Olivia Hall",
      "David King",
      "Sophia Young",
      "James Hernandez",
      "Victoria Allen",
      "Isabella Scott",
      "Andrew Lopez",
      "Mason Hill",
      "Charlotte Green",
      "Liam Adams",
      "Abigail Nelson",
    ],
    ["Emily Clark", "Michael Turner", "Sophia Garcia"],
    ["Robert Mitchell", "Lucas Perez", "Olivia Moore"],
  ];

  return (
    <div className="main">
      <div className="container">
        <div className="lines-container">
          <svg className="line" width="100%" height="100%">
            {boxPositions.map((position, index) => (
              <React.Fragment key={index}>
                <line
                  y1={
                    mainBoxSize / 2 -
                    Math.min(scrollAmount, initialBoxDistances[index].vertical)
                  }
                  x1={position.left + mainBoxSize / 2}
                  y2={
                    mainBoxSize / 2 +
                    Math.min(scrollAmount, initialBoxDistances[index].vertical)
                  }
                  x2={position.left + mainBoxSize / 2}
                  stroke="white"
                  strokeWidth="1"
                />
                {index < boxPositions.length - 1 && (
                  <>
                    <line
                      x1={position.left + mainBoxSize / 2}
                      y1={mainBoxSize / 2}
                      x2={
                        boxPositions[index + 1].left -
                        boxPositions[index].left +
                        position.left
                      }
                      y2={mainBoxSize / 2}
                      stroke="white"
                      strokeWidth="1"
                    />
                    <line
                      x1={
                        boxPositions[index + 1].left -
                        boxPositions[index].left +
                        position.left
                      }
                      y1={mainBoxSize / 2}
                      x2={
                        boxPositions[index + 1].left -
                        boxPositions[index].left +
                        position.left
                      }
                      y2={
                        mainBoxSize / 2 +
                        (boxPositions[index + 1].top - position.top)
                      }
                      stroke="white"
                      strokeWidth="1"
                    />
                  </>
                )}
                {oldBoxCompleted &&
                  scrollAmount >= initialBoxDistances[index].vertical &&
                  customLeftTexts[index].map((_, i) => (
                    <React.Fragment key={i}>
                      <line
                        x1={position.left + mainBoxSize / 2}
                        y1={
                          mainBoxSize / 2 - initialBoxDistances[index].vertical
                        }
                        x2={
                          position.left +
                          mainBoxSize / 2 -
                          Math.min(
                            scrollAmount - initialBoxDistances[index].vertical,
                            initialBoxDistances[index].left + i * 55
                          )
                        }
                        y2={
                          mainBoxSize / 2 - initialBoxDistances[index].vertical
                        }
                        stroke="white"
                        strokeWidth="1"
                      />
                      <line
                        x1={position.left + mainBoxSize / 2}
                        y1={
                          mainBoxSize / 2 + initialBoxDistances[index].vertical
                        }
                        x2={
                          position.left +
                          mainBoxSize / 2 +
                          Math.min(
                            scrollAmount - initialBoxDistances[index].vertical,
                            initialBoxDistances[index].right + i * 55
                          )
                        }
                        y2={
                          mainBoxSize / 2 + initialBoxDistances[index].vertical
                        }
                        stroke="white"
                        strokeWidth="1"
                      />
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ))}
          </svg>
        </div>

        {boxPositions.map((position, index) => (
          <div
            key={index}
            className="main-box"
            style={{
              left: `${position.left}px`,
              top: `${position.top}px`,
            }}
          >
            <span className="box-title mainB">{position.title}</span>

            <div
              className="connected-box left-box"
              style={{
                transform: `translateY(-${Math.min(
                  scrollAmount,
                  initialBoxDistances[index].vertical
                )}px)`,
              }}
            >
              <span className="box-title connectedB">Role</span>
            </div>

            <div
              className="connected-box right-box"
              style={{
                transform: `translateY(${Math.min(
                  scrollAmount,
                  initialBoxDistances[index].vertical
                )}px)`,
              }}
            >
              <span className="box-title connectedB">Name</span>
            </div>

            {oldBoxCompleted &&
              scrollAmount >= initialBoxDistances[index].vertical &&
              customLeftTexts[index].map((leftText, i) => (
                <React.Fragment key={i}>
                  <div
                    className="connected-box left-box"
                    style={{
                      top: `-${initialBoxDistances[index].vertical}px`,
                      transform: `translateX(-${Math.min(
                        scrollAmount - initialBoxDistances[index].vertical,
                        initialBoxDistances[index].left + i * 55
                      )}px)`,
                    }}
                  >
                    <span className="box-title connectedB">{leftText}</span>
                  </div>

                  <div
                    className="connected-box right-box"
                    style={{
                      top: `${initialBoxDistances[index].vertical}px`,
                      transform: `translateX(${Math.min(
                        scrollAmount - initialBoxDistances[index].vertical,
                        initialBoxDistances[index].right + i * 55
                      )}px)`,
                    }}
                  >
                    <span className="box-title connectedB">
                      {customRightTexts[index][i]}
                    </span>
                  </div>
                </React.Fragment>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
