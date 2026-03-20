import { useState } from 'react'
import { parseColors, toCssVariables } from './utils'

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
        
        <div className="mb-8">
          <textarea
            className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-y"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            placeholder="Ingresa los colores en formato:
White: hsl(0, 0%, 100%)
Stone 100: hsl(30, 54%, 90%)"
          />
        </div>

        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <label className="font-medium text-gray-700">Prefijo CSS:</label>
            <input
              type="text"
              className="flex-1 max-w-xs px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
              value={cssPrefix}
              onChange={(e) => setCssPrefix(e.target.value)}
              placeholder="--color-"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copied ? 'Copiado!' : 'Copiar CSS'}
            </button>
          </div>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
            {cssOutput}
          </pre>
        </div>

        <div className="auto-grid" data-fit="auto-fit">
          {colors.map((color, index) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div 
                className="w-full h-24"
                style={{ background: color.value }}
              />
              <div className="bg-white p-3 text-center">
                <div className="text-sm font-medium text-gray-800">{color.label}</div>
                <div className="text-xs text-gray-500 mt-1">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
