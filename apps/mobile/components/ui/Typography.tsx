import type { ReactNode } from "react";
import type { StyleProp, TextProps, TextStyle } from "react-native";
import { Text } from "react-native";
import { getTextClassName } from "./textStyles";

export type TypographyProps = TextProps & {
  children: ReactNode;
  numberOfLines?: number;
  weight?: "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold";
  style?: StyleProp<TextStyle>;
  font?: "poppins" | "outfit" | "noto-kufi" | "cairo";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  color?: "primary" | "secondary" | "muted" | "white" | "black" | "gray-600" | "gray-400";
  variant?: "body" | "heading" | "caption" | "title";
  locale?: "en" | "ar"; // For automatic font selection
};

export const Typography = ({
  children,
  className,
  weight = "regular",
  font,
  size = "base",
  color = "primary",
  variant = "body",
  locale = "en",
  numberOfLines = 0,
  ...props
}: TypographyProps) => {
  // Auto-select font based on locale and variant if no specific font provided
  const resolvedFont = font || getDefaultFont(variant, locale);
  const allowFontScaling = props.allowFontScaling ?? !["4xl", "5xl"].includes(size);
  const maxFontSizeMultiplier = props.maxFontSizeMultiplier ?? 1.3;

  return (
    <Text
      className={getTextClassName({
        weight,
        font: resolvedFont,
        size,
        color,
        variant,
        className
      })}
      numberOfLines={numberOfLines}
      allowFontScaling={allowFontScaling}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      {...props}
    >
      {children}
    </Text>
  );
};

// Helper function to determine default font based on variant and locale
function getDefaultFont(variant: TypographyProps["variant"], locale: TypographyProps["locale"]) {
  if (locale === "ar") {
    return variant === "heading" ? "noto-kufi" : "cairo";
  }

  return variant === "heading" ? "outfit" : "poppins";
}

// Convenience components for common use cases
export const Heading = (props: Omit<TypographyProps, "variant">) => (
  <Typography {...props} variant="heading" />
);

export const Body = (props: Omit<TypographyProps, "variant">) => (
  <Typography {...props} variant="body" />
);

export const Caption = (props: Omit<TypographyProps, "variant">) => (
  <Typography {...props} variant="caption" size="sm" color="gray-600" />
);

export const Title = (props: Omit<TypographyProps, "variant">) => (
  <Typography {...props} variant="title" font="outfit" weight="bold" size="2xl" />
);