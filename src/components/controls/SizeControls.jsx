import { useEffect, useState, useRef } from "react";

const PX_PER_REM = 16;
const FONT_SIZE_LIMITS = {
  px: { min: 8, max: 72 },
  rem: { min: 0.5, max: 4.5 },
};
const SLIDER_LIMITS = {
  width: { px: { max: 400 }, rem: { max: 25 } },
  height: { px: { max: 400 }, rem: { max: 25 } },
};

function convertUnit(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  return fromUnit === "px" ? value / PX_PER_REM : value * PX_PER_REM;
}

function formatValue(value, unit) {
  return unit === "px" ? Math.round(value) : parseFloat(value.toFixed(4));
}

function SizeControls({
  style,
  updateStyle,
  unit,
  fontSize,
  setFontSize,
  minWidth,
  setMinWidth,
  minHeight,
  setMinHeight,
  prevUnit,
  setPrevUnit,
  fontSizeRef,
  widthRef,
  heightRef,
  sizeMode,
  setSizeMode,
}) {
  const TEXT = "Button";
  const charFactor = unit === "px" ? 0.7 : 0.65;
  const lineHeightFactor = 1.4;

  const maxWidth = SLIDER_LIMITS.width[unit].max;
  const maxHeight = SLIDER_LIMITS.height[unit].max;

  useEffect(() => {
    if (unit !== prevUnit) {
      const oldFont = parseFloat(style.fontSize);
      const oldWidth = parseFloat(style.width);
      const oldHeight = parseFloat(style.height);

      const newFont = convertUnit(oldFont, prevUnit, unit);
      const newWidth = convertUnit(oldWidth, prevUnit, unit);
      const newHeight = convertUnit(oldHeight, prevUnit, unit);

      const bufferWidth = unit === "px" ? 45 : 2.8125;
      const bufferHeight = unit === "px" ? 20 : 1.25;

      const newMinWidth = newFont * TEXT.length * charFactor + bufferWidth;
      const newMinHeight = newFont * lineHeightFactor + bufferHeight;

      const clampedWidth = Math.min(Math.max(newWidth, newMinWidth), maxWidth);
      const clampedHeight = Math.min(
        Math.max(newHeight, newMinHeight),
        maxHeight
      );

      setFontSize(newFont);
      setMinWidth(newMinWidth);
      setMinHeight(newMinHeight);

      updateStyle("fontSize", `${formatValue(newFont, unit)}${unit}`);
      updateStyle("width", `${formatValue(clampedWidth, unit)}${unit}`);
      updateStyle("height", `${formatValue(clampedHeight, unit)}${unit}`);

      fontSizeRef.current = newFont;
      widthRef.current = clampedWidth;
      heightRef.current = clampedHeight;
      setPrevUnit(unit);
    }
  }, [unit]);

  const handleFontSizeChange = (val) => {
    const newFontSize = Number(val);
    const bufferWidth = unit === "px" ? 45 : 2.8125;
    const bufferHeight = unit === "px" ? 20 : 1.25;

    const oldFontSize = fontSizeRef.current;
    const oldMinWidth = oldFontSize * TEXT.length * charFactor + bufferWidth;
    const oldMinHeight = oldFontSize * lineHeightFactor + bufferHeight;

    const newMinWidth = newFontSize * TEXT.length * charFactor + bufferWidth;
    const newMinHeight = newFontSize * lineHeightFactor + bufferHeight;

    const currWidth = widthRef.current;
    const currHeight = heightRef.current;

    const oldRangeWidth = maxWidth - oldMinWidth;
    const newRangeWidth = maxWidth - newMinWidth;
    const oldRangeHeight = maxHeight - oldMinHeight;
    const newRangeHeight = maxHeight - newMinHeight;

    let adjustedWidth, adjustedHeight;

    if (sizeMode === "slider") {
      const widthRatio =
        oldRangeWidth === 0 ? 0 : (currWidth - oldMinWidth) / oldRangeWidth;
      const heightRatio =
        oldRangeHeight === 0 ? 0 : (currHeight - oldMinHeight) / oldRangeHeight;

      adjustedWidth = newMinWidth + widthRatio * newRangeWidth;
      adjustedHeight = newMinHeight + heightRatio * newRangeHeight;
    } else {
      const scaleFactor = newFontSize / oldFontSize;
      adjustedWidth = currWidth * scaleFactor;
      adjustedHeight = currHeight * scaleFactor;
    }

    // Clamp
    adjustedWidth = Math.min(Math.max(adjustedWidth, newMinWidth), maxWidth);
    adjustedHeight = Math.min(
      Math.max(adjustedHeight, newMinHeight),
      maxHeight
    );

    fontSizeRef.current = newFontSize;
    widthRef.current = adjustedWidth;
    heightRef.current = adjustedHeight;

    setMinWidth(newMinWidth);
    setMinHeight(newMinHeight);
    setFontSize(newFontSize);

    updateStyle("fontSize", `${formatValue(newFontSize, unit)}${unit}`);
    updateStyle("width", `${formatValue(adjustedWidth, unit)}${unit}`);
    updateStyle("height", `${formatValue(adjustedHeight, unit)}${unit}`);
  };

  useEffect(() => {
    const actualWidth = parseFloat(style.width);
    const actualHeight = parseFloat(style.height);

    if (actualWidth < minWidth) {
      updateStyle("width", `${formatValue(minWidth, unit)}${unit}`);
      widthRef.current = minWidth;
    }

    if (actualHeight < minHeight) {
      updateStyle("height", `${formatValue(minHeight, unit)}${unit}`);
      heightRef.current = minHeight;
    }
  }, [minWidth, minHeight, style.width, style.height, unit]);

  return (
    <div>
      <h3>Size Controls</h3>
      <div>
        <label>
          Size Behavior:
          <select
            value={sizeMode}
            onChange={(e) => setSizeMode(e.target.value)}
          >
            <option value="slider">Preserve Slider Position</option>
            <option value="proportional">Scale Proportionally</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Font Size:
          <input
            type="range"
            min={FONT_SIZE_LIMITS[unit].min}
            max={FONT_SIZE_LIMITS[unit].max}
            step={unit === "px" ? 1 : 0.1}
            value={fontSize}
            onChange={(e) => handleFontSizeChange(e.target.value)}
          />
          <span>
            {fontSize}
            {unit}
          </span>
        </label>
      </div>

      <div>
        <label>
          Width:
          <input
            type="range"
            min={minWidth}
            max={maxWidth}
            step="0.01"
            value={parseFloat(style.width)}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              widthRef.current = value;
              updateStyle("width", `${formatValue(value, unit)}${unit}`);
            }}
          />
          <span>{style.width}</span>
        </label>
      </div>

      <div>
        <label>
          Height:
          <input
            type="range"
            min={minHeight}
            max={maxHeight}
            step="0.01"
            value={parseFloat(style.height)}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              heightRef.current = value;
              updateStyle("height", `${formatValue(value, unit)}${unit}`);
            }}
          />
          <span>{style.height}</span>
        </label>
      </div>
    </div>
  );
}

export default SizeControls;
