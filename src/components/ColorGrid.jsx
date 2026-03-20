import { COLOR_FORMATS } from "../utils";

function ColorGrid({ colors, outputFormat, onFormatChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-base-content">Color Preview</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-base-content/60">Format:</label>
          <select
            className="select select-bordered select-sm"
            value={outputFormat}
            onChange={(e) => onFormatChange(e.target.value)}
          >
            {COLOR_FORMATS.map((format) => (
              <option key={format} value={format}>
                {format.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
          >
            <div className="h-24 w-full" style={{ background: color.value }} />
            <div className="card-body p-3 text-center">
              <div className="text-sm font-medium capitalize text-base-content">
                {color.label}
              </div>
              <div className="text-xs text-base-content/60 mt-1 font-mono">
                {color.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorGrid;
