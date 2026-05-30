import { HTMLAttributes, forwardRef } from "react";
import { colors, borderRadius, spacing, shadows } from "./tokens";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "white",
          borderRadius: borderRadius.lg,
          border: variant === "outlined" ? `1px solid ${colors.gray[200]}` : "none",
          boxShadow: variant === "default" ? shadows.md : "none",
          padding: spacing.lg,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
