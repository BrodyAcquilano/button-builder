import React, { useState, useEffect } from "react";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";
import bg5 from "../../assets/bg5.jpg";
import bg6 from "../../assets/bg6.jpg";
import bg7 from "../../assets/bg7.jpg";
import bg8 from "../../assets/bg8.webp";

const backgroundImages = [
  { label: "City Day", value: bg1 },
  { label: "Field Sunset", value: bg2 },
  { label: "City Night 1", value: bg3 },
  { label: "City Night 2", value: bg4 },
  { label: "Lake Night", value: bg5 },
  { label: "City Night 3", value: bg6 },
  { label: "City Night 4", value: bg7 },
  { label: "Field Day", value: bg8 },
];

function ColorControls({
  style,
  updateStyle,
  containerStyle,
  setContainerStyle,
}) {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgAlpha, setBgAlpha] = useState(1);
  const [useImage, setUseImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(backgroundImages[0].value);
  useEffect(() => {
    // Parse rgba() or hex from style.backgroundColor
    const bg = style.backgroundColor;
    if (bg?.startsWith("rgba")) {
      const match = bg.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);
      if (match) {
        const [_, r, g, b, a] = match;
        const hex = `#${(
          (1 << 24) +
          (parseInt(r) << 16) +
          (parseInt(g) << 8) +
          parseInt(b)
        )
          .toString(16)
          .slice(1)}`;
        setBgColor(hex);
        setBgAlpha(parseFloat(a));
      }
    } else if (bg?.startsWith("#")) {
      setBgColor(bg);
      setBgAlpha(1);
    }
  }, [style.backgroundColor]);

  useEffect(() => {
    if (useImage) {
      setContainerStyle({
        backgroundImage: `url(${selectedImage})`,
        backgroundSize: "contain" ,
        backgroundRepeat: "no-repeat",
      });
    } else {
      setContainerStyle((prev) => ({
        ...prev,
        backgroundImage: "none",
      }));
    }
  }, [useImage, selectedImage]);

  const updateBgColor = (hex) => {
    setBgColor(hex);
    updateStyle("backgroundColor", hexToRgba(hex, bgAlpha));
  };

  const updateAlpha = (a) => {
    setBgAlpha(a);
    updateStyle("backgroundColor", hexToRgba(bgColor, a));
  };

  const hexToRgba = (hex, alpha) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <div>
      <h3>Color Controls</h3>

      <div>
        <label>
          Preview Background:
          <input
            type="color"
            value={containerStyle.backgroundColor}
            onChange={(e) =>
              setContainerStyle({
                ...containerStyle,
                backgroundColor: e.target.value,
              })
            }
          />
        </label>
      </div>
      <div>
        <label>
          Button Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => updateBgColor(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Alpha:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={bgAlpha}
            onChange={(e) => updateAlpha(parseFloat(e.target.value))}
          />
          <span>{bgAlpha}</span>
        </label>
      </div>

      <div>
        <label>
          Text Color:
          <input
            type="color"
            value={style.color || "#000000"}
            onChange={(e) => updateStyle("color", e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Use Background Image:
          <input
            type="checkbox"
            checked={useImage}
            onChange={(e) => setUseImage(e.target.checked)}
          />
        </label>
      </div>

      {useImage && (
        <div>
          <label>
            Select Image:
            <select
              value={selectedImage}
              onChange={(e) => setSelectedImage(e.target.value)}
            >
              {backgroundImages.map((img, idx) => (
                <option key={idx} value={img.value}>
                  {img.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

export default ColorControls;
