import { BannerType } from "@/lib/types/bannerType";
import { Box, Typography, Paper } from "@mui/material";

export default function Banner({
  title,
  content,
  icon: Icon,
  children,
}: BannerType) {
  const gradientBg =
    "linear-gradient(135deg, rgb(57, 117, 201) 0%, rgb(41, 86, 153) 100%)";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        mb: { xs: 3, md: 4 },
        p: 0,
        borderRadius: "12px",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 8px 32px rgba(30, 64, 175, 0.15)",
      }}
    >
      <Box
        sx={{
          background: gradientBg,
          backdropFilter: "blur(8px)",
          position: "relative",
          p: { xs: 3, md: 4 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -30,
            top: -30,
            width: { xs: 120, md: 180 },
            height: { xs: 120, md: 180 },
            borderRadius: "50%",
            background:
              "linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.03))",
            filter: "blur(1px)",
            transform: "rotate(-15deg)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            right: { xs: 30, md: 80 },
            bottom: -50,
            width: { xs: 100, md: 140 },
            height: { xs: 100, md: 140 },
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(4px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: -20,
            bottom: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
            display: { xs: "none", md: "block" },
          }}
        />

        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1.5, md: 2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 48, md: 56 },
                height: { xs: 48, md: 56 },
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                boxShadow:
                  "inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {Icon && (
                <Icon
                  sx={{
                    color: "white",
                    fontSize: { xs: 26, md: 30 },
                    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                  }}
                />
              )}
            </Box>

            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: "white",
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </Typography>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255, 255, 255, 0.95)",
              mt: { xs: 1.5, md: 2 },
              fontWeight: 400,
              maxWidth: { xs: "100%", md: "75%" },
              fontSize: { xs: "0.875rem", md: "1rem" },
              lineHeight: 1.6,
              pl: { xs: 0, md: 9 },
              opacity: 0.9,
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            {content}
          </Typography>
        </Box>
        {children}
      </Box>
    </Paper>
  );
}
