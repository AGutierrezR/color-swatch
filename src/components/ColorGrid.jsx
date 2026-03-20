function ColorGrid({ colors }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {colors.map((color, index) => (
        <div
          key={index}
          className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
        >
          <div className="h-24 w-full" style={{ background: color.value }} />
          <div className="card-body p-3 text-center">
            <div className="text-sm font-medium text-base-content">
              {color.label}
            </div>
            <div className="text-xs text-base-content/60 mt-1">
              {color.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ColorGrid;
