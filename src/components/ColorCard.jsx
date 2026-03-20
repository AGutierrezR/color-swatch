function ColorCard({ color, layout }) {
  if (layout === "grid") {
    return (
      <div className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
        <div className="h-40 w-full rounded-t-lg" style={{ background: color.value }} />
        <div className="card-body p-3 text-center">
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

  return (
    <div className="bg-base-100 shadow-md hover:shadow-xl transition-all duration-200 flex items-center gap-4 p-2 rounded-lg">
      <div className="w-40 h-20 flex-shrink-0 rounded-lg" style={{ background: color.value }} />
      <div className="flex-1">
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
