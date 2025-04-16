import { Box, Typography, Paper } from "@mui/material";
import NextImage from "next/image";
import { BannerType } from "@/lib/types/bannerType";

export default function Banner({
  title,
  content,
  icon: Icon,
  avatarUrl,
  boardColor,
  children,
}: BannerType & { 
  avatarUrl?: string | null; 
  boardColor?: string;
  bgColor?: string; 
  textColor?: string 
}) {
  // 使用傳入的boardColor或默認漸變背景
  const gradientBg = boardColor = "linear-gradient(135deg, #3975c9 0%, #295699 100%)";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        mb: { xs: 3, md: 4 },
        p: 0,
        borderRadius: "16px",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          background: gradientBg,
          position: "relative",
          p: { xs: 3, md: 4 },
          overflow: "hidden",
        }}
      >
        {/* 圓形背景裝飾 */}
        <Box
          sx={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            zIndex: 0,
          }}
        />
        
        <Box
          sx={{
            position: "absolute",
            bottom: "-50px",
            left: "10%",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
            zIndex: 0,
          }}
        />
        
        {/* 小圓點裝飾 */}
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            right: "15%",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.5)",
            zIndex: 0,
          }}
        />
        
        <Box
          sx={{
            position: "absolute",
            top: "45%",
            right: "25%",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.4)",
            zIndex: 0,
          }}
        />
        
        <Box
          sx={{
            position: "absolute",
            top: "65%",
            right: "10%",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.3)",
            zIndex: 0,
          }}
        />
        
        {/* 內容區域 */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, md: 2.5 },
            }}
          >
            {avatarUrl ? (
              <NextImage
                src={avatarUrl}
                alt="看板頭像"
                width={56}
                height={56}
                style={{
                  borderRadius: "14px",
                  objectFit: "cover",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(255, 255, 255, 0.1)",
                }}
              />
            ) : (
              Icon && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 52, md: 58 },
                    height: { xs: 52, md: 58 },
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    boxShadow:
                      "0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.12)",
                  }}
                >
                  <Icon
                    sx={{
                      color: "#ffffff",
                      fontSize: { xs: 26, md: 30 },
                      filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2))",
                    }}
                  />
                </Box>
              )
            )}

            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: "#ffffff",
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                letterSpacing: "-0.01em",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {title}
            </Typography>
          </Box>

          {content && (
            <Typography
              variant="subtitle1"
              sx={{
                color: "rgba(255, 255, 255, 0.95)",
                mt: { xs: 1.5, md: 2 },
                fontWeight: 400,
                maxWidth: { xs: "100%", md: "75%" },
                fontSize: { xs: "0.9rem", md: "1.05rem" },
                lineHeight: 1.7,
                pl: { xs: 0, md: 9 },
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              {content}
            </Typography>
          )}
        </Box>
        
        {/* 子元素容器 */}
        {children && (
          <Box sx={{ mt: 3, position: "relative", zIndex: 2 }}>
            {children}
          </Box>
        )}
      </Box>
    </Paper>
  );
}