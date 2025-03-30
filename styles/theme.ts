import { createTheme } from "@mui/material/styles";

// Define colors only once - enhanced blue palette with more texture and depth
export const colors = {
  // More sophisticated blue accent colors
  accent: "#1e40af", // Deeper, richer blue as the main accent
  accentLight: "#dbeafe", // Softer, subtle light blue
  accentDark: "#1e3a8a", // Deep navy blue for contrast
  accentHover: "#3b82f6", // Vibrant blue for hover states

  // Secondary accent for layering and depth
  secondaryAccent: "#0369a1", // Complementary cyan-blue

  // Text colors with better contrast
  textPrimary: "#1e293b", // Darker text for better readability
  textSecondary: "#475569", // Medium slate for secondary text

  // Background colors
  cardBg: "#ffffff",
  surfaceLight: "#f1f5f9", // Light surface for subtle backgrounds

  // Enhanced gradient
  gradient: "linear-gradient(135deg, #1e40af 0%, #0ea5e9 100%)",

  // Subtle overlay for layered effects
  overlay: "rgba(15, 23, 42, 0.04)",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.accent,
      light: colors.accentLight,
      dark: colors.accentDark,
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.secondaryAccent,
      light: colors.accentLight,
      dark: colors.accentDark,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    background: {
      default: "#f8fafc",
      paper: colors.cardBg,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 4px rgba(15, 23, 42, 0.08)",
          "&:hover": {
            backgroundColor: colors.accentHover,
            boxShadow: "0px 4px 8px rgba(15, 23, 42, 0.12)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 12px rgba(15, 23, 42, 0.05)",
          "&:hover": {
            boxShadow: "0px 8px 16px rgba(15, 23, 42, 0.08)",
          },
        },
      },
    },
  },
});

export default theme;
