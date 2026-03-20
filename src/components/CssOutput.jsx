import { COLOR_FORMATS } from "../utils";

function CssOutput({
  prefix,
  onPrefixChange,
  cssOutput,
  copied,
  onCopy,
  outputFormat,
  onFormatChange,
}) {
  return (
    <div className="flow mb-8 bg-base-200 p-6 rounded-lg">
      <div className="auto-grid" data-fit="two-columns">
        <div className="flow">
          <label className="font-medium text-base-content">CSS prefix:</label>
          <input
            type="text"
            className="input input-bordered w-full font-mono text-sm"
            value={prefix}
            onChange={(e) => onPrefixChange(e.target.value)}
            placeholder="--color"
          />
        </div>
        <div className="flow">
          <label className="font-medium text-base-content">Format:</label>
          <select
            className="select select-bordered w-full"
            value={outputFormat}
            onChange={(e) => onFormatChange(e.target.value)}
          >
            {COLOR_FORMATS.map((format) => (
              <option key={format} value={format}>
                {format.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <pre className="bg-base-300 text-base-content p-4 rounded-lg overflow-x-auto text-sm font-mono">
        {cssOutput}
      </pre>
      <button
        onClick={onCopy}
        className={`btn btn-block mt-4 ${copied ? "btn-success" : "btn-primary"}`}
      >
        {copied ? "Copied!" : "Copy CSS"}
      </button>
    </div>
  );
}

export default CssOutput;
