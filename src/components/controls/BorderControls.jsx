import React from "react";

function BorderControls({ style, updateStyle, widthRef, heightRef }) {
  const width = widthRef.current || 0;
  const height = heightRef.current || 0;
  const smallerDimension = Math.min(width, height);

  // Max border width = 25% of smaller dimension
  const maxBorderWidth = Math.round(smallerDimension * 0.25);

  // Max border radius = 50% of smaller dimension
  const maxBorderRadius = Math.round(smallerDimension * 0.5);

  return (
    <div>
      <h3>Border Controls</h3>

      <div>
        <label>
          Border Width:
          <input
            type="range"
            min="0"
            max={maxBorderWidth}
            value={parseFloat(style.borderWidth) || 0}
            onChange={(e) => updateStyle("borderWidth", `${e.target.value}px`)}
          />
          <span>{style.borderWidth || "0px"}</span>
        </label>
      </div>

      <div>
        <label>
          Border Radius:
          <input
            type="range"
            min="0"
            max={maxBorderRadius}
            value={parseFloat(style.borderRadius) || 0}
            onChange={(e) => updateStyle("borderRadius", `${e.target.value}px`)}
          />
          <span>{style.borderRadius || "0px"}</span>
        </label>
      </div>

      <div>
        <label>
          Border Color:
          <input
            type="color"
            value={style.borderColor || "#000000"}
            onChange={(e) => updateStyle("borderColor", e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Border Style:
          <select
            value={style.borderStyle || "solid"}
            onChange={(e) => updateStyle("borderStyle", e.target.value)}
          >
            <option value="none">None</option>
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
            <option value="groove">Groove</option>
            <option value="ridge">Ridge</option>
            <option value="inset">Inset</option>
            <option value="outset">Outset</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default BorderControls;
