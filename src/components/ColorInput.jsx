function ColorInput({ value, onChange }) {
  return (
    <div className="mb-8">
      <p className="text-sm text-gray-500 mb-2">
        Format: <code className="bg-gray-100 px-1 rounded">color: value</code> (value can be hex, rgb, hsl, etc.)
      </p>
      <textarea
        className="textarea textarea-bordered w-full h-48 font-mono text-sm resize-y"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter colors in format:
White: hsl(0, 0%, 100%)
Stone 100: hsl(30, 54%, 90%)"
      />
    </div>
  );
}

export default ColorInput;
