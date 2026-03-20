import { useState } from "react";
import { parseColors, toCssVariables, convertColors } from "./utils";
import ColorInput from "./components/ColorInput";
import CssOutput from "./components/CssOutput";
import ColorGrid from "./components/ColorGrid";

const defaultColors = `White: hsl(0, 0%, 100%)
Stone 100: hsl(30, 54%, 90%)
Stone 150: hsl(30, 18%, 87%)
Stone 600: hsl(30, 10%, 34%)
Stone 900: hsl(24, 5%, 18%)
Brown 800: hsl(14, 45%, 36%)
Rose 800: hsl(332, 51%, 32%)
Rose 50: hsl(330, 100%, 98%)`;

function App() {
  const [inputValue, setInputValue] = useState(defaultColors);
  const [extractedColors, setExtractedColors] = useState([]);
  const [cssPrefix, setCssPrefix] = useState("--color");
  const [outputFormat, setOutputFormat] = useState("hsl");
  const [copied, setCopied] = useState(false);

  const extractPalette = () => {
    const colors = parseColors(inputValue);
    setExtractedColors(colors);
  };

  const formattedColors = convertColors(extractedColors, outputFormat);
  const cssOutput = toCssVariables(formattedColors, cssPrefix);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="wrapper">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">ColorSwatch</h1>
          <p className="text-base-content/60">
            Generate CSS color variables
          </p>
        </div>

        <div className="sidebar">
          <div>
            <ColorInput value={inputValue} onChange={setInputValue} onExtract={extractPalette} />

            <CssOutput
              prefix={cssPrefix}
              onPrefixChange={setCssPrefix}
              cssOutput={cssOutput}
              copied={copied}
              onCopy={copyToClipboard}
              outputFormat={outputFormat}
              onFormatChange={setOutputFormat}
            />
          </div>

          <div>
            <ColorGrid
              colors={formattedColors}
              outputFormat={outputFormat}
              onFormatChange={setOutputFormat}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
