import { ButtonHTMLAttributes, forwardRef } from "react";
import { colors, borderRadius, spacing, typography, fontWeight } from "./tokens";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: colors.primary[600],
    color: "white",
  },
  secondary: {
    backgroundColor: colors.gray[200],
    color: colors.gray[900],
  },
  outline: {
    backgroundColor: "transparent",
    border: `1px solid ${colors.gray[300]}`,
    color: colors.gray[700],
  },
  ghost: {
    backgroundColor: "transparent",
    color: colors.gray[700],
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: `${spacing.xs} ${spacing.sm}`,
    fontSize: typography.fontSize.sm,
  },
  md: {
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.fontSize.base,
  },
  lg: {
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: typography.fontSize.lg,
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", fullWidth = false, disabled, style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{
          fontFamily: typography.fontFamily.sans,
          fontWeight: fontWeight.medium,
          borderRadius: borderRadius.md,
          border: variant === "outline" ? undefined : "none",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          width: fullWidth ? "100%" : "auto",
          transition: "all 0.2s",
          ...variantStyles[variant],
          ...sizeStyles[size],
          ...style,
        }}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
