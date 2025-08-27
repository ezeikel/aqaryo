import type { TypographyProps } from "./Typography";

type TextStyleConfig = {
  weight: TypographyProps["weight"];
  font: TypographyProps["font"];
  size: TypographyProps["size"];
  color: TypographyProps["color"];
  variant?: TypographyProps["variant"];
  className?: string;
};

export function getTextClassName({
  weight = "regular",
  font = "poppins",
  size = "base",
  color = "primary",
  className = "",
}: TextStyleConfig): string {
  const fontClass = getFontClass(font, weight);
  const sizeClass = getSizeClass(size);
  const colorClass = getColorClass(color);
  
  return [fontClass, sizeClass, colorClass, className]
    .filter(Boolean)
    .join(" ");
}

function getFontClass(font: TypographyProps["font"], weight: TypographyProps["weight"]): string {
  const fontMap = {
    poppins: {
      light: "font-poppins-light",
      regular: "font-poppins-regular",
      medium: "font-poppins-medium",
      semibold: "font-poppins-semibold",
      bold: "font-poppins-bold",
      extrabold: "font-poppins-bold", // Fallback to bold
    },
    outfit: {
      light: "font-outfit-regular", // Fallback to regular
      regular: "font-outfit-regular",
      medium: "font-outfit-medium",
      semibold: "font-outfit-semibold",
      bold: "font-outfit-bold",
      extrabold: "font-outfit-extrabold",
    },
    "noto-kufi": {
      light: "font-noto-kufi-regular", // Fallback to regular
      regular: "font-noto-kufi-regular",
      medium: "font-noto-kufi-medium",
      semibold: "font-noto-kufi-semibold",
      bold: "font-noto-kufi-bold",
      extrabold: "font-noto-kufi-bold", // Fallback to bold
    },
    cairo: {
      light: "font-cairo-regular", // Fallback to regular
      regular: "font-cairo-regular",
      medium: "font-cairo-medium",
      semibold: "font-cairo-semibold",
      bold: "font-cairo-bold",
      extrabold: "font-cairo-bold", // Fallback to bold
    },
  };

  return fontMap[font!]?.[weight!] || "font-poppins-regular";
}

function getSizeClass(size: TypographyProps["size"]): string {
  const sizeMap = {
    xs: "text-xs",    // 12px
    sm: "text-sm",    // 14px
    base: "text-base", // 16px
    lg: "text-lg",    // 18px
    xl: "text-xl",    // 20px
    "2xl": "text-2xl", // 24px
    "3xl": "text-3xl", // 30px
    "4xl": "text-4xl", // 36px
    "5xl": "text-5xl", // 48px
  };

  return sizeMap[size!] || "text-base";
}

function getColorClass(color: TypographyProps["color"]): string {
  const colorMap = {
    primary: "text-foreground",
    secondary: "text-muted-foreground",
    muted: "text-muted-foreground",
    white: "text-white",
    black: "text-black",
    "gray-600": "text-gray-600",
    "gray-400": "text-gray-400",
  };

  return colorMap[color!] || "text-foreground";
}