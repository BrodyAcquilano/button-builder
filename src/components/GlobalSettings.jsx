function GlobalSettings({ unit, setUnit }) {
  return (
    <div className="global-settings">
      <h3>Global Settings</h3>
      <label>
        Units:
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="px">px</option>
          <option value="rem">rem</option>
        </select>
      </label>
    </div>
  );
}

export default GlobalSettings;