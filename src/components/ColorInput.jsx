function ColorInput({ value, onChange, onExtract }) {
  return (
    <div className="flow mb-8 bg-base-200 p-6 rounded-lg">
      <p className="text-[0.625rem] uppercase font-semibold">Input Workspace</p>
      <h2 className="text-[1.5rem] font-normal">Enter Colors</h2>
      <p className="text-sm text-gray-500 mb-4">
        Paste your HEX codes, RGB, or color names. Our curator will organize them into an editorial-grade palette.
      </p>
      <textarea
        className="textarea textarea-bordered w-full h-48 font-mono text-sm resize-y"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter colors in format:
White: hsl(0, 0%, 100%)
Stone 100: hsl(30, 54%, 90%)"
      />
      <button className="btn btn-primary w-full mt-4" onClick={onExtract}>
        Extract Palette
      </button>
    </div>
  );
}

export default ColorInput;
