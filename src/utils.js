export const COLOR_FORMATS = ["hex", "rgb", "hsl"];

function parseRgb(color) {
  const match = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (match) {
    return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
  }
  return null;
}

function parseHex(color) {
  const match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (match) {
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16),
    };
  }
  const shortMatch = color.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
  if (shortMatch) {
    return {
      r: parseInt(shortMatch[1] + shortMatch[1], 16),
      g: parseInt(shortMatch[2] + shortMatch[2], 16),
      b: parseInt(shortMatch[3] + shortMatch[3], 16),
    };
  }
  return null;
}

function parseHsl(color) {
  const match = color.match(
    /hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/i
  );
  if (match) {
    return {
      h: parseInt(match[1]),
      s: parseInt(match[2]),
      l: parseInt(match[3]),
    };
  }
  return null;
}

export function detectColorFormat(colorString) {
  const trimmed = colorString.trim();
  if (trimmed.startsWith("hsl")) return "hsl";
  if (trimmed.startsWith("rgb")) return "rgb";
  if (trimmed.startsWith("#") || /^[a-f\d]{3,6}$/i.test(trimmed)) return "hex";
  return null;
}

export function parseColor(colorString) {
  let rgb = parseRgb(colorString);
  if (rgb) return rgb;

  rgb = parseHex(colorString);
  if (rgb) return rgb;

  const hsl = parseHsl(colorString);
  if (hsl) {
    return hslToRgb(hsl.h, hsl.s, hsl.l);
  }

  return null;
}

export function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function convertColor(colorString, targetFormat) {
  const rgb = parseColor(colorString);
  if (!rgb) return colorString;

  switch (targetFormat) {
    case "hex":
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    case "rgb":
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case "hsl": {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
    default:
      return colorString;
  }
}

export function convertColors(colors, targetFormat) {
  return colors.map((color) => ({
    ...color,
    value: convertColor(color.value, targetFormat),
  }));
}

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
export function toCssVariables(colors, prefix = "--color") {
  if (colors.length === 0) {
    return ":root {}";
  }

  const varName = (label) => {
    const normalized = label.toLowerCase().replace(/\s+/g, "-");
    return `${prefix}-${normalized}`;
  };

  const lines = colors.map(
    ({ label, value }) => `  ${varName(label)}: ${value};`
  );

  return `:root {\n${lines.join("\n")}\n}`;
}
