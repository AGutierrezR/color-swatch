function ColorInput({ value, onChange }) {
  return (
    <div className="mb-8">
      <textarea
        className="textarea textarea-bordered w-full h-48 font-mono text-sm resize-y"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ingresa los colores en formato:
White: hsl(0, 0%, 100%)
Stone 100: hsl(30, 54%, 90%)"
      />
    </div>
  );
}

export default ColorInput;
