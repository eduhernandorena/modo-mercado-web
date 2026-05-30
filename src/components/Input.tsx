import { InputHTMLAttributes, forwardRef } from "react";
import { colors, borderRadius, spacing, typography, fontWeight } from "./tokens";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, disabled, style, ...props }, ref) => {
    return (
      <div style={{ width: fullWidth ? "100%" : "auto", marginBottom: spacing.md }}>
        {label && (
          <label
            style={{
              display: "block",
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.sm,
              fontWeight: fontWeight.medium,
              color: colors.gray[700],
              marginBottom: spacing.xs,
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          disabled={disabled}
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.base,
            fontWeight: fontWeight.normal,
            borderRadius: borderRadius.md,
            border: `1px solid ${error ? colors.error[500] : colors.gray[300]}`,
            backgroundColor: disabled ? colors.gray[100] : "white",
            color: colors.gray[900],
            padding: `${spacing.sm} ${spacing.md}`,
            width: "100%",
            boxSizing: "border-box",
            cursor: disabled ? "not-allowed" : "text",
            opacity: disabled ? 0.5 : 1,
            transition: "border-color 0.2s",
            ...style,
          }}
          {...props}
        />
        {error && (
          <p
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.sm,
              color: colors.error[600],
              marginTop: spacing.xs,
              margin: 0,
            }}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
