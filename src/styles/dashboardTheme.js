// ===src/styles/dashboardTheme.js==

const dashboardTheme = {
  colors: {
    background: "radial-gradient(circle at top, #0b1d33, #050b18)",

    glassBg: "rgba(255, 255, 255, 0.06)",
    glassBorder: "rgba(0, 229, 255, 0.35)",

    primary: "#00e5ff",
    secondary: "#1de9b6",

    sidebarGradient: "linear-gradient(180deg, #071a2c, #0b2f45)",

    textPrimary: "#ffffff",
    textSecondary: "#9fb3c8",

    warning: "#ffca28",
  },

  blur: {
    glass: "blur(18px)",
  },

  borderRadius: {
    xl: "22px",
    lg: "18px",
    md: "14px",
  },

  glow: {
    header: "0 0 0 1px rgba(0,229,255,0.35), 0 10px 40px rgba(0,229,255,0.35)",

    card: "0 0 0 1px rgba(255,255,255,0.15), 0 12px 35px rgba(0,229,255,0.25)",

    active: "0 0 0 1px rgba(0,229,255,0.6), 0 0 35px rgba(0,229,255,0.65)",
  },
};

export default dashboardTheme;
