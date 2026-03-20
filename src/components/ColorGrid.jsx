import { useState } from "react";
import ColorCard from "./ColorCard";
import SectionHeader from "./SectionHeader";

function ColorGrid({ colors }) {
  const [layout, setLayout] = useState("grid");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionHeader title="Colors Palette" subtitle="Visualizer" />
        <div className="flex items-center gap-2">
          <button
            className={`btn btn-sm btn-ghost ${layout === "grid" ? "btn-active" : ""}`}
            onClick={() => setLayout("grid")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            className={`btn btn-sm btn-ghost ${layout === "list" ? "btn-active" : ""}`}
            onClick={() => setLayout("list")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {colors.length === 0 ? (
        <div className="text-center py-12 text-base-content/50">
          <p className="text-lg mb-2">No colors to display</p>
          <p className="text-sm">
            Enter colors in the input and click "Extract Palette" to get started
          </p>
        </div>
      ) : (
        <div
          className={
            layout === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              : "flex flex-col gap-2"
          }
        >
          {colors.map((color, index) => (
            <ColorCard key={index} color={color} layout={layout} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorGrid;
