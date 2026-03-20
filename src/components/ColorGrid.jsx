import { useState } from "react";
import { COLOR_FORMATS } from "../utils";

function ColorGrid({ colors, outputFormat, onFormatChange }) {
  const [layout, setLayout] = useState("grid");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-base-content">Color Preview</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-base-content/60">Layout:</label>
            <div className="join">
              <button
                className={`btn btn-sm join-item ${layout === "grid" ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setLayout("grid")}
              >
                Grid
              </button>
              <button
                className={`btn btn-sm join-item ${layout === "list" ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setLayout("list")}
              >
                List
              </button>
            </div>
          </div>
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
      </div>
      <div
        className={
          layout === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            : "flex flex-col gap-2"
        }
      >
        {colors.map((color, index) => (
          <div
            key={index}
            className={`bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${
              layout === "grid" ? "card" : "flex items-center gap-4 p-2 rounded-lg"
            }`}
          >
            {layout === "list" && (
              <div className="w-16 h-16 flex-shrink-0 rounded" style={{ background: color.value }} />
            )}
            {layout === "grid" && <div className="h-24 w-full" style={{ background: color.value }} />}
            <div className={layout === "grid" ? "card-body p-3 text-center" : "flex-1"}>
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
