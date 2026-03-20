function CssOutput({ prefix, onPrefixChange, cssOutput, copied, onCopy }) {
  return (
    <div className="mb-8 bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium text-gray-700">Prefijo CSS:</label>
        <input
          type="text"
          className="flex-1 max-w-xs px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
          value={prefix}
          onChange={(e) => onPrefixChange(e.target.value)}
          placeholder="--color-"
        />
        <button
          onClick={onCopy}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {copied ? "Copiado!" : "Copiar CSS"}
        </button>
      </div>
      <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
        {cssOutput}
      </pre>
    </div>
  );
}

export default CssOutput;
