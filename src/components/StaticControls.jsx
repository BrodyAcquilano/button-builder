import { useEffect, useState, useRef } from "react";

import SizeControls from "./controls/SizeControls";
import ColorControls from "./controls/ColorControls";
import BorderControls from "./controls/BorderControls";
import LightingControls from "./controls/LightingControls";
import TextControls from "./controls/TextControls";

import "./StaticControls.css";

function StaticControls({
  style,
  updateStyle,
  unit,
  containerStyle,
  setContainerStyle,
}) {
  //Size Control constants.
  const [fontSize, setFontSize] = useState(16);
  const [minWidth, setMinWidth] = useState(108);
  const [minHeight, setMinHeight] = useState(42);
  const [prevUnit, setPrevUnit] = useState(unit);
  const [sizeMode, setSizeMode] = useState("slider");
  const fontSizeRef = useRef(parseFloat(style.fontSize));
  const widthRef = useRef(parseFloat(style.width));
  const heightRef = useRef(parseFloat(style.height));

  return (
    <div className="static-controls">
      <h2 id="title">Static Controls</h2>

      <div className="size-controls">
        <SizeControls
          style={style}
          updateStyle={updateStyle}
          unit={unit}
          fontSize={fontSize}
          setFontSize={setFontSize}
          minWidth={minWidth}
          setMinWidth={setMinWidth}
          minHeight={minHeight}
          setMinHeight={setMinHeight}
          prevUnit={prevUnit}
          setPrevUnit={setPrevUnit}
          fontSizeRef={fontSizeRef}
          widthRef={widthRef}
          heightRef={heightRef}
          sizeMode={sizeMode}
          setSizeMode={setSizeMode}
        />
      </div>

      <div className="color-controls">
        <ColorControls
          style={style}
          updateStyle={updateStyle}
          containerStyle={containerStyle}
          setContainerStyle={setContainerStyle}
        />
      </div>

      <div className="border-controls">
        <BorderControls
          style={style}
          updateStyle={updateStyle}
          widthRef={widthRef}
          heightRef={heightRef}
        />
      </div>

      <div className="lighting-controls">
        <LightingControls style={style} updateStyle={updateStyle} />
      </div>

      <div className="text-controls">
        <TextControls style={style} updateStyle={updateStyle} />
      </div>
    </div>
  );
}

export default StaticControls;
