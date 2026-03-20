/**
 * @typedef {Object} Color
 * @property {string} label - The name/identifier of the color
 * @property {string} value - The color value (e.g., hsl, hex, rgb)
 */

/**
 * Parses a string of colors into an array of color objects.
 * Each line should be in the format "Label: value".
 * Lines without a colon or empty lines are skipped.
 *
 * @param {string} input - Multi-line string with colors in "Label: value" format
 * @returns {Color[]} Array of parsed color objects with label and value
 * @example
 * parseColors("White: hsl(0, 0%, 100%)\nStone 100: hsl(30, 54%, 90%)")
 * // Returns: [{ label: "White", value: "hsl(0, 0%, 100%)" }, { label: "Stone 100", value: "hsl(30, 54%, 90%)" }]
 */
export function parseColors(input) {
  const lines = input.trim().split("\n");
  const colors = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const colonIndex = trimmed.indexOf(":");
    if (colonIndex === -1) continue;

    const label = trimmed.substring(0, colonIndex).trim();
    const value = trimmed.substring(colonIndex + 1).trim();

    colors.push({ label, value });
  }

  return colors;
}

/**
 * Converts an array of colors to CSS custom properties format.
 * Labels are converted to kebab-case (lowercase, spaces replaced with hyphens).
 *
 * @param {Color[]} colors - Array of color objects
 * @param {string} [prefix='--color-'] - Prefix for CSS variable names
 * @returns {string} CSS custom properties wrapped in :root block
 * @example
 * toCssVariables([{ label: "Primary Blue", value: "#0066ff" }], '--theme-')
 * // Returns: ":root {\n  --theme-primary-blue: #0066ff;\n}"
 */
export function toCssVariables(colors, prefix = "--color-") {
  if (colors.length === 0) {
    return ":root {}";
  }

  const varName = (label) => {
    const normalized = label.toLowerCase().replace(/\s+/g, "-");
    return `${prefix}${normalized}`;
  };

  const lines = colors.map(
    ({ label, value }) => `  ${varName(label)}: ${value};`
  );

  return `:root {\n${lines.join("\n")}\n}`;
}
