import { describe, it, expect } from "vitest";
import {
  parseColors,
  toCssVariables,
  detectColorFormat,
  parseColor,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  convertColor,
  convertColors,
  COLOR_FORMATS,
} from "../src/utils";

describe("utils", () => {
  describe("parseColors", () => {
    it("should parse multiple colors correctly", () => {
      const input = `White: hsl(0, 0%, 100%)
  Stone 100: hsl(30, 54%, 90%)`;

      const result = parseColors(input);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ label: "White", value: "hsl(0, 0%, 100%)" });
      expect(result[1]).toEqual({
        label: "Stone 100",
        value: "hsl(30, 54%, 90%)",
      });
    });

    it("should skip empty lines", () => {
      const input = `White: hsl(0, 0%, 100%)

  Stone 100: hsl(30, 54%, 90%)`;

      const result = parseColors(input);

      expect(result).toHaveLength(2);
    });

    it("should skip lines without colon", () => {
      const input = `White: hsl(0, 0%, 100%)
  Invalid line without colon
  Stone 100: hsl(30, 54%, 90%)`;

      const result = parseColors(input);

      expect(result).toHaveLength(2);
    });

    it("should handle extra whitespace", () => {
      const input = `  White  :  hsl(0, 0%, 100%)  `;

      const result = parseColors(input);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ label: "White", value: "hsl(0, 0%, 100%)" });
    });

    it("should return empty array for empty input", () => {
      const result = parseColors("");
      expect(result).toHaveLength(0);
    });

    it("should handle the default colors from App", () => {
      const input = `White: hsl(0, 0%, 100%)
  Stone 100: hsl(30, 54%, 90%)
  Stone 150: hsl(30, 18%, 87%)
  Stone 600: hsl(30, 10%, 34%)
  Stone 900: hsl(24, 5%, 18%)
  Brown 800: hsl(14, 45%, 36%)
  Rose 800: hsl(332, 51%, 32%)
  Rose 50: hsl(330, 100%, 98%)`;

      const result = parseColors(input);

      expect(result).toHaveLength(8);
      expect(result[0]).toEqual({ label: "White", value: "hsl(0, 0%, 100%)" });
      expect(result[7]).toEqual({
        label: "Rose 50",
        value: "hsl(330, 100%, 98%)",
      });
    });
  });

  describe("toCssVariables", () => {
    it("should generate CSS variables with default prefix", () => {
      const colors = [{ label: "White", value: "hsl(0, 0%, 100%)" }];

      const result = toCssVariables(colors);

      expect(result).toBe(":root {\n  --color-white: hsl(0, 0%, 100%);\n}");
    });

    it("should generate CSS variables with custom prefix", () => {
      const colors = [{ label: "Primary", value: "#ff0000" }];

      const result = toCssVariables(colors, "--theme");

      expect(result).toBe(":root {\n  --theme-primary: #ff0000;\n}");
    });

    it("should convert spaces in labels to hyphens", () => {
      const colors = [{ label: "Stone 100", value: "hsl(30, 54%, 90%)" }];

      const result = toCssVariables(colors);

      expect(result).toContain("--color-stone-100: hsl(30, 54%, 90%)");
    });

    it("should convert labels to lowercase", () => {
      const colors = [{ label: "PRIMARY BLUE", value: "blue" }];

      const result = toCssVariables(colors);

      expect(result).toContain("--color-primary-blue: blue");
    });

    it("should handle multiple colors", () => {
      const colors = [
        { label: "White", value: "hsl(0, 0%, 100%)" },
        { label: "Stone 100", value: "hsl(30, 54%, 90%)" },
      ];

      const result = toCssVariables(colors);

      expect(result).toBe(`:root {
  --color-white: hsl(0, 0%, 100%);
  --color-stone-100: hsl(30, 54%, 90%);
}`);
    });

    it("should handle empty colors array", () => {
      const result = toCssVariables([]);

      expect(result).toBe(":root {}");
    });

    it("should generate CSS for default App colors", () => {
      const colors = parseColors(`White: hsl(0, 0%, 100%)
  Stone 100: hsl(30, 54%, 90%)`);

      const result = toCssVariables(colors);

      expect(result).toContain("--color-white: hsl(0, 0%, 100%)");
      expect(result).toContain("--color-stone-100: hsl(30, 54%, 90%)");
    });
  });

  describe("COLOR_FORMATS", () => {
    it("should export supported color formats", () => {
      expect(COLOR_FORMATS).toEqual(["hex", "rgb", "hsl"]);
    });
  });

  describe("detectColorFormat", () => {
    it("should detect hsl format", () => {
      expect(detectColorFormat("hsl(0, 0%, 100%)")).toBe("hsl");
      expect(detectColorFormat("hsla(0, 0%, 100%, 0.5)")).toBe("hsl");
    });

    it("should detect rgb format", () => {
      expect(detectColorFormat("rgb(255, 0, 0)")).toBe("rgb");
      expect(detectColorFormat("rgba(255, 0, 0, 0.5)")).toBe("rgb");
    });

    it("should detect hex format", () => {
      expect(detectColorFormat("#ff0000")).toBe("hex");
      expect(detectColorFormat("f00")).toBe("hex");
      expect(detectColorFormat("ffffff")).toBe("hex");
    });

    it("should return null for unknown format", () => {
      expect(detectColorFormat("red")).toBe(null);
      expect(detectColorFormat("invalid")).toBe(null);
    });
  });

  describe("rgbToHex", () => {
    it("should convert rgb to hex", () => {
      expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
      expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
      expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
    });

    it("should handle black and white", () => {
      expect(rgbToHex(0, 0, 0)).toBe("#000000");
      expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
    });

    it("should handle gray", () => {
      expect(rgbToHex(128, 128, 128)).toBe("#808080");
    });

    it("should clamp values", () => {
      expect(rgbToHex(300, -10, 128)).toBe("#ff0080");
    });
  });

  describe("rgbToHsl", () => {
    it("should convert red to hsl", () => {
      const hsl = rgbToHsl(255, 0, 0);
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);
    });

    it("should convert green to hsl", () => {
      const hsl = rgbToHsl(0, 255, 0);
      expect(hsl.h).toBe(120);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);
    });

    it("should convert blue to hsl", () => {
      const hsl = rgbToHsl(0, 0, 255);
      expect(hsl.h).toBe(240);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);
    });

    it("should convert white to hsl", () => {
      const hsl = rgbToHsl(255, 255, 255);
      expect(hsl).toEqual({ h: 0, s: 0, l: 100 });
    });

    it("should convert black to hsl", () => {
      const hsl = rgbToHsl(0, 0, 0);
      expect(hsl).toEqual({ h: 0, s: 0, l: 0 });
    });

    it("should convert gray to hsl", () => {
      const hsl = rgbToHsl(128, 128, 128);
      expect(hsl.s).toBe(0);
      expect(hsl.l).toBe(50);
    });
  });

  describe("hslToRgb", () => {
    it("should convert red hsl to rgb", () => {
      const rgb = hslToRgb(0, 100, 50);
      expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should convert green hsl to rgb", () => {
      const rgb = hslToRgb(120, 100, 50);
      expect(rgb).toEqual({ r: 0, g: 255, b: 0 });
    });

    it("should convert blue hsl to rgb", () => {
      const rgb = hslToRgb(240, 100, 50);
      expect(rgb).toEqual({ r: 0, g: 0, b: 255 });
    });

    it("should convert white hsl to rgb", () => {
      const rgb = hslToRgb(0, 0, 100);
      expect(rgb).toEqual({ r: 255, g: 255, b: 255 });
    });

    it("should convert black hsl to rgb", () => {
      const rgb = hslToRgb(0, 0, 0);
      expect(rgb).toEqual({ r: 0, g: 0, b: 0 });
    });

    it("should convert gray hsl to rgb", () => {
      const rgb = hslToRgb(0, 0, 50);
      expect(rgb).toEqual({ r: 128, g: 128, b: 128 });
    });
  });

  describe("parseColor", () => {
    it("should parse rgb format", () => {
      const result = parseColor("rgb(255, 0, 0)");
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should parse rgba format", () => {
      const result = parseColor("rgba(255, 0, 0, 0.5)");
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should parse hex format", () => {
      const result = parseColor("#ff0000");
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should parse short hex format", () => {
      const result = parseColor("#f00");
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should parse hsl format", () => {
      const result = parseColor("hsl(0, 100%, 50%)");
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should parse hsla format", () => {
      const result = parseColor("hsla(0, 100%, 50%, 0.5)");
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should return null for invalid color", () => {
      expect(parseColor("invalid")).toBe(null);
    });
  });

  describe("convertColor", () => {
    it("should convert hex to rgb", () => {
      expect(convertColor("#ff0000", "rgb")).toBe("rgb(255, 0, 0)");
    });

    it("should convert hex to hsl", () => {
      expect(convertColor("#ff0000", "hsl")).toBe("hsl(0, 100%, 50%)");
    });

    it("should convert rgb to hex", () => {
      expect(convertColor("rgb(0, 255, 0)", "hex")).toBe("#00ff00");
    });

    it("should convert rgb to hsl", () => {
      expect(convertColor("rgb(0, 0, 255)", "hsl")).toBe("hsl(240, 100%, 50%)");
    });

    it("should convert hsl to hex", () => {
      expect(convertColor("hsl(120, 100%, 50%)", "hex")).toBe("#00ff00");
    });

    it("should convert hsl to rgb", () => {
      expect(convertColor("hsl(240, 100%, 50%)", "rgb")).toBe("rgb(0, 0, 255)");
    });

    it("should keep original format for unknown format", () => {
      expect(convertColor("red", "hex")).toBe("red");
    });

    it("should handle white color conversion", () => {
      expect(convertColor("hsl(0, 0%, 100%)", "hex")).toBe("#ffffff");
      expect(convertColor("hsl(0, 0%, 100%)", "rgb")).toBe("rgb(255, 255, 255)");
    });

    it("should handle black color conversion", () => {
      expect(convertColor("hsl(0, 0%, 0%)", "hex")).toBe("#000000");
      expect(convertColor("hsl(0, 0%, 0%)", "rgb")).toBe("rgb(0, 0, 0)");
    });
  });

  describe("convertColors", () => {
    it("should convert array of colors to hex", () => {
      const colors = [
        { label: "Red", value: "hsl(0, 100%, 50%)" },
        { label: "Green", value: "hsl(120, 100%, 50%)" },
      ];

      const result = convertColors(colors, "hex");

      expect(result[0].label).toBe("Red");
      expect(result[0].value).toBe("#ff0000");
      expect(result[1].label).toBe("Green");
      expect(result[1].value).toBe("#00ff00");
    });

    it("should convert array of colors to rgb", () => {
      const colors = [{ label: "Blue", value: "#0000ff" }];

      const result = convertColors(colors, "rgb");

      expect(result[0]).toEqual({ label: "Blue", value: "rgb(0, 0, 255)" });
    });

    it("should convert array of colors to hsl", () => {
      const colors = [{ label: "White", value: "#ffffff" }];

      const result = convertColors(colors, "hsl");

      expect(result[0]).toEqual({ label: "White", value: "hsl(0, 0%, 100%)" });
    });

    it("should preserve color labels", () => {
      const colors = [{ label: "Primary 500", value: "rgb(59, 130, 246)" }];

      const result = convertColors(colors, "hex");

      expect(result[0].label).toBe("Primary 500");
    });

    it("should handle empty array", () => {
      const result = convertColors([], "hex");
      expect(result).toEqual([]);
    });
  });
});
