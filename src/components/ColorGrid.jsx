import { useState } from "react";
import ColorCard from "./ColorCard";
import LayoutToggle from "./LayoutToggle";
import SectionHeader from "./SectionHeader";

function ColorGrid({ colors }) {
  const [layout, setLayout] = useState("grid");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionHeader title="Colors Palette" subtitle="Visualizer" />
        <LayoutToggle layout={layout} onLayoutChange={setLayout} />
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
          className={layout === "grid" ? "auto-grid" : "flex flex-col gap-2"}
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
