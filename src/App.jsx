import { useState } from 'react'

const defaultColors = `White: hsl(0, 0%, 100%)
Stone 100: hsl(30, 54%, 90%)
Stone 150: hsl(30, 18%, 87%)
Stone 600: hsl(30, 10%, 34%)
Stone 900: hsl(24, 5%, 18%)
Brown 800: hsl(14, 45%, 36%)
Rose 800: hsl(332, 51%, 32%)
Rose 50: hsl(330, 100%, 98%)`

function parseColors(input) {
  const lines = input.trim().split('\n')
  const colors = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const colonIndex = trimmed.indexOf(':')
    if (colonIndex === -1) continue

    const label = trimmed.substring(0, colonIndex).trim()
    const value = trimmed.substring(colonIndex + 1).trim()

    colors.push({ label, value })
  }

  return colors
}

function App() {
  const [colorInput, setColorInput] = useState(defaultColors)
  const colors = parseColors(colorInput)

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
