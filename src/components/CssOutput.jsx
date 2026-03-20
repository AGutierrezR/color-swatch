import { COLOR_FORMATS } from "../utils";

function CssOutput({ prefix, onPrefixChange, cssOutput, copied, onCopy, outputFormat, onFormatChange }) {
  return (
    <div className="mb-8 bg-base-200 p-6 rounded-lg">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <label className="font-medium text-base-content">CSS prefix:</label>
        <input
          type="text"
          className="input input-bordered flex-1 max-w-xs font-mono text-sm"
          value={prefix}
          onChange={(e) => onPrefixChange(e.target.value)}
          placeholder="--color-"
        />
        <label className="font-medium text-base-content">Format:</label>
        <select
          className="select select-bordered"
          value={outputFormat}
          onChange={(e) => onFormatChange(e.target.value)}
        >
          {COLOR_FORMATS.map((format) => (
            <option key={format} value={format}>
              {format.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          onClick={onCopy}
          className={`btn ${copied ? "btn-success" : "btn-primary"}`}
        >
          {copied ? "Copied!" : "Copy CSS"}
        </button>
      </div>
      <pre className="bg-base-300 text-base-content p-4 rounded-lg overflow-x-auto text-sm font-mono">
        {cssOutput}
      </pre>
    </div>
  );
}

export default CssOutput;
