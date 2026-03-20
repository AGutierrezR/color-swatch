import { useState } from 'react'
import './App.css'

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
    <div className="container">
      <h1>Color Palette</h1>
      
      <div className="input-section">
        <textarea
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
          placeholder="Ingresa los colores en formato:
White: hsl(0, 0%, 100%)
Stone 100: hsl(30, 54%, 90%)"
        />
      </div>

      <div className="palette">
        {colors.map((color, index) => (
          <div key={index} className="swatch">
            <div 
              className="color-box" 
              style={{ background: color.value }}
            />
            <div className="label">
              {color.label}
              <span>{color.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App