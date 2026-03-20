import { describe, it, expect } from "vitest";
import { parseColors, toCssVariables } from "../src/utils";

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

      const result = toCssVariables(colors, "--theme-");

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
});
