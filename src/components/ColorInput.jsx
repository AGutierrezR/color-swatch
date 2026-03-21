import SectionHeader from "./SectionHeader";

function ColorInput({ value, onChange, onExtract }) {
  return (
    <div className="flow mb-8 bg-base-100 p-6 rounded-lg">
      <SectionHeader
        title="Enter Colors"
        subtitle="Input Workspace"
        description="Paste your HEX codes, RGB, or color names. Our curator will organize them into an editorial-grade palette."
      />
      <textarea
        className="textarea textarea-bordered w-full h-48 font-mono text-sm resize-y"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter colors in format:
White: hsl(0, 0%, 100%)
Stone 100: hsl(30, 54%, 90%)"
      />
      <button className="btn btn-neutral w-full mt-4" onClick={onExtract}>
        Extract Palette
      </button>
    </div>
  );
}

export default ColorInput;
