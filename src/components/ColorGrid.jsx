function ColorGrid({ colors }) {
  return (
    <div className="auto-grid" data-fit="auto-fit">
      {colors.map((color, index) => (
        <div
          key={index}
          className="rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
        >
          <div className="w-full h-24" style={{ background: color.value }} />
          <div className="bg-white p-3 text-center">
            <div className="text-sm font-medium text-gray-800">
              {color.label}
            </div>
            <div className="text-xs text-gray-500 mt-1">{color.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ColorGrid;
