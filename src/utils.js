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