import { useState } from 'react'
import { parseColors, toCssVariables } from './utils'
import ColorInput from './components/ColorInput'
import CssOutput from './components/CssOutput'
import ColorGrid from './components/ColorGrid'

const defaultColors = `White: hsl(0, 0%, 100%)
Stone 100: hsl(30, 54%, 90%)
Stone 150: hsl(30, 18%, 87%)
Stone 600: hsl(30, 10%, 34%)
Stone 900: hsl(24, 5%, 18%)
Brown 800: hsl(14, 45%, 36%)
Rose 800: hsl(332, 51%, 32%)
Rose 50: hsl(330, 100%, 98%)`

function App() {
  const [colorInput, setColorInput] = useState(defaultColors)
  const [cssPrefix, setCssPrefix] = useState('--color-')
  const [copied, setCopied] = useState(false)
  const colors = parseColors(colorInput)
  const cssOutput = toCssVariables(colors, cssPrefix)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="wrapper py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">ColorSwatch</h1>

        <ColorInput value={colorInput} onChange={setColorInput} />

        <CssOutput
          prefix={cssPrefix}
          onPrefixChange={setCssPrefix}
          cssOutput={cssOutput}
          copied={copied}
          onCopy={copyToClipboard}
        />

        <ColorGrid colors={colors} />
      </div>
    </div>
  )
}

export default App
