function CssOutput({ prefix, onPrefixChange, cssOutput, copied, onCopy }) {
  return (
    <div className="mb-8 bg-base-200 p-6 rounded-lg">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <label className="font-medium text-base-content">Prefijo CSS:</label>
        <input
          type="text"
          className="input input-bordered flex-1 max-w-xs font-mono text-sm"
          value={prefix}
          onChange={(e) => onPrefixChange(e.target.value)}
          placeholder="--color-"
        />
        <button
          onClick={onCopy}
          className={`btn ${copied ? "btn-success" : "btn-primary"}`}
        >
          {copied ? "Copiado!" : "Copiar CSS"}
        </button>
      </div>
      <pre className="bg-base-300 text-base-content p-4 rounded-lg overflow-x-auto text-sm font-mono">
        {cssOutput}
      </pre>
    </div>
  );
}

export default CssOutput;
