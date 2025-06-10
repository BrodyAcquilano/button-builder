import React from "react";

export default function CssOutput({ style }) {
  function toCssString(styleObj) {
    return Object.entries(styleObj)
      .map(([key, value]) => {
        // Convert camelCase to kebab-case
        const kebabKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        return `${kebabKey}: ${value};`;
      })
      .join("\n");
  }

  const cssText = toCssString(style);

  function copyToClipboard() {
    navigator.clipboard.writeText(cssText);
  }

  return (
    <div>
      <h2>CSS Output</h2>
      <textarea
        value={cssText}
        readOnly
        style={{
          width: "100%",
          height: "200px",
          fontFamily: "monospace",
          padding: "0.5rem",
          marginBottom: "1rem",
          resize: "none",
        }}
      />
      <button onClick={copyToClipboard}>Copy CSS</button>
    </div>
  );
}
