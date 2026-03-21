function ColorCard({ color, layout }) {
  const isGrid = layout === "grid";

  return (
    <div
      className={`bg-base-100 shadow-md hover:shadow-xl transition-all duration-200 ${
        isGrid ? "card hover:-translate-y-1" : "flex items-center gap-4 p-2"
      }`}
    >
      <div
        className={`rounded-lg flex-shrink-0 ${isGrid ? "h-40 w-full rounded-t-lg" : "w-40 h-20"}`}
        style={{ background: color.value }}
      />
      <div className={isGrid ? "card-body p-3 text-center" : "flex-1"}>
        <div className="text-sm font-medium capitalize text-base-content">
          {color.label}
        </div>
        <div className="text-xs text-base-content/60 mt-1 font-mono">
          {color.value}
        </div>
      </div>
    </div>
  );
}

export default ColorCard;
