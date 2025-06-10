import "./App.css";
import { useState } from "react";
import GlobalSettings from "./components/GlobalSettings";
import StaticControls from "./components/StaticControls";
import AnimationControls from "./components/AnimationControls";
import ButtonPreview from "./components/ButtonPreview";
import CssOutput from "./components/CssOutput";

function App() {
  const [style, setStyle] = useState({
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    borderRadius: "8px",
    fontSize: "16px",
    width: "150px",
    height: "50px",
  });

  const [containerStyle, setContainerStyle] = useState({
    backgroundColor: "#ffffff",
  });

  const [unit, setUnit] = useState("px");

  function updateStyle(key, value) {
    setStyle((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="app-container">
      <div className="title-bar">
        <h1 className="title">Click Me</h1>
      </div>

      <div className="body-container">
        <div className="controls-column">
          <div className="global-row">
            <GlobalSettings unit={unit} setUnit={setUnit} />
          </div>
          <div className="static-row">
            <StaticControls
              style={style}
              updateStyle={updateStyle}
              unit={unit}
              containerStyle={containerStyle}
              setContainerStyle={setContainerStyle}
            />
          </div>
          <div className="animation-row">
            <AnimationControls unit={unit} />
          </div>
        </div>
        <div className="preview-column" style={containerStyle}>
          <ButtonPreview style={style} />
          
        </div>
        <div className="css-column">
          <CssOutput style={style} unit={unit} />
        </div>
      </div>
    </div>
  );
}

export default App;
