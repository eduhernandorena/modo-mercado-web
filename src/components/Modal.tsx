import { ReactNode, useEffect } from "react";
import { colors, spacing, typography, fontWeight, borderRadius, shadows } from "./tokens";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: spacing.md,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: borderRadius.lg,
          boxShadow: shadows.xl,
          maxWidth: "500px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            style={{
              padding: `${spacing.lg} ${spacing.lg} ${spacing.md}`,
              borderBottom: `1px solid ${colors.gray[200]}`,
            }}
          >
            <h2
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize.xl,
                fontWeight: fontWeight.semibold,
                color: colors.gray[900],
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>
        )}
        <div style={{ padding: spacing.lg }}>{children}</div>
      </div>
    </div>
  );
}
