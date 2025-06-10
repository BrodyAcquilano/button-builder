import React from "react";

function LightingControls({ style, updateStyle }) {
  const parseShadow = (shadow = "") => {
    const [offsetX = 0, offsetY = 0, blur = 0, color = "#000000"] = shadow
      .split(/px|rem/)
      .map((v) => v.trim())
      .filter((v) => v);
    return {
      offsetX: parseInt(offsetX) || 0,
      offsetY: parseInt(offsetY) || 0,
      blur: parseInt(blur) || 0,
      color: color || "#000000",
    };
  };

  const current = parseShadow(style.boxShadow);

  const updateShadow = (key, value) => {
    const newShadow = {
      ...current,
      [key]: value,
    };
    updateStyle(
      "boxShadow",
      `${newShadow.offsetX}px ${newShadow.offsetY}px ${newShadow.blur}px ${newShadow.color}`
    );
  };

  return (
    <div>
      <h3>Lighting Controls</h3>

      <div>
        <label>
          Offset X:
          <input
            type="range"
            min="-100"
            max="100"
            value={current.offsetX}
            onChange={(e) => updateShadow("offsetX", parseInt(e.target.value))}
          />
          <span>{current.offsetX}px</span>
        </label>
      </div>

      <div>
        <label>
          Offset Y:
          <input
            type="range"
            min="-100"
            max="100"
            value={current.offsetY}
            onChange={(e) => updateShadow("offsetY", parseInt(e.target.value))}
          />
          <span>{current.offsetY}px</span>
        </label>
      </div>

      <div>
        <label>
          Shadow Blur Radius:
          <input
            type="range"
            min="0"
            max="100"
            value={current.blur}
            onChange={(e) => updateShadow("blur", parseInt(e.target.value))}
          />
          <span>{current.blur}px</span>
        </label>
      </div>
      <div>
        <label>
          Shadow Color:
          <input
            type="color"
            value={current.color}
            onChange={(e) => updateShadow("color", e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Element Blur:
          <input
            type="range"
            min="0"
            max="20"
            value={parseFloat(style.filter?.replace("blur(", "") || 0)}
            onChange={(e) => updateStyle("filter", `blur(${e.target.value}px)`)}
          />
          <span>{style.filter || "blur(0px)"}</span>
        </label>
      </div>

      <div>
        <label>
  Backdrop Blur:
  <input
    type="range"
    min="0"
    max="20"
    value={parseFloat(style.backdropFilter?.replace("blur(", "") || 0)}
    onChange={(e) =>
      updateStyle("backdropFilter", `blur(${e.target.value}px)`)
    }
  />
  <span>{style.backdropFilter || "blur(0px)"}</span>
</label>
      </div>

      <div>
        <label>
          Opacity:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={style.opacity || 1}
            onChange={(e) => updateStyle("opacity", parseFloat(e.target.value))}
          />
          <span>{style.opacity || 1}</span>
        </label>
      </div>
    </div>
  );
}

export default LightingControls;
