export function parseColors(input) {
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

export function toCssVariables(colors, prefix = '--color-') {
  if (colors.length === 0) {
    return ':root {}'
  }

  const varName = (label) => {
    const normalized = label.toLowerCase().replace(/\s+/g, '-')
    return `${prefix}${normalized}`
  }

  const lines = colors.map(({ label, value }) => `  ${varName(label)}: ${value};`)

  return `:root {\n${lines.join('\n')}\n}`
}