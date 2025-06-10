import React from "react";

function TextControls({ style, updateStyle }) {
  return (
    <div>
      <h3>Text Controls</h3>

      <div>
        <label>
          Font Family:
          <select
            value={style.fontFamily || "sans-serif"}
            onChange={(e) => updateStyle("fontFamily", e.target.value)}
          >
            <option value="sans-serif">Sans-serif</option>
            <option value="serif">Serif</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Verdana, sans-serif">Verdana</option>
            <option value="Tahoma, sans-serif">Tahoma</option>
            <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Courier New, monospace">Courier New</option>
            <option value="Lucida Console, monospace">Lucida Console</option>
            <option value="Segoe UI, sans-serif">Segoe UI</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
            <option value="fantasy">Fantasy</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Font Weight:
          <select
            value={style.fontWeight || "400"}
            onChange={(e) => updateStyle("fontWeight", e.target.value)}
          >
            <option value="100">Thin</option>
            <option value="300">Light</option>
            <option value="400">Normal</option>
            <option value="600">Semi-Bold</option>
            <option value="700">Bold</option>
            <option value="900">Extra Bold</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Text Align:
          <select
            value={style.textAlign || "center"}
            onChange={(e) => updateStyle("textAlign", e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Text Transform:
          <select
            value={style.textTransform || "none"}
            onChange={(e) => updateStyle("textTransform", e.target.value)}
          >
            <option value="none">None</option>
            <option value="uppercase">UPPERCASE</option>
            <option value="lowercase">lowercase</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Font Style:
          <select
            value={style.fontStyle || "normal"}
            onChange={(e) => updateStyle("fontStyle", e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="oblique">Oblique</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Text Decoration:
          <select
            value={style.textDecoration || "none"}
            onChange={(e) => updateStyle("textDecoration", e.target.value)}
          >
            <option value="none">None</option>
            <option value="underline">Underline</option>
            <option value="line-through">Line Through</option>
            <option value="overline">Overline</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default TextControls;
