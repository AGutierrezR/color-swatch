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
  const [colorInput, setColorInput] = useState(defaultColors);
  const [cssPrefix, setCssPrefix] = useState("--color-");
  const [outputFormat, setOutputFormat] = useState("hsl");
  const [copied, setCopied] = useState(false);
  const colors = parseColors(colorInput);
  const formattedColors = convertColors(colors, outputFormat);
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

        <h2 className="text-xl font-semibold mb-4 text-base-content">Enter Colors</h2>

        <ColorInput value={colorInput} onChange={setColorInput} />

        <h2 className="text-xl font-semibold mb-4 text-base-content">CSS Output</h2>

        <CssOutput
          prefix={cssPrefix}
          onPrefixChange={setCssPrefix}
          cssOutput={cssOutput}
          copied={copied}
          onCopy={copyToClipboard}
          outputFormat={outputFormat}
          onFormatChange={setOutputFormat}
        />

        <ColorGrid colors={formattedColors} outputFormat={outputFormat} onFormatChange={setOutputFormat} />
      </div>
    </div>
  );
}

export default App;
