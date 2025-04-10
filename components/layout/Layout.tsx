import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery, useTheme } from "@mui/material";

// 引入拆分後的組件
import Navbar from "./Navbar";
import Sidebar from "./sidebar";
import ProfileSection from "./profile/ProfileSection";
import OnlineUsers from "./profile/OnlineUsers";
import ActionButton from "../common/ActionButton";

// 背景色
const bgColor = "#f8fafc"; // Light gray background
const profileCardWidth = 320;

interface LayoutProps {
  children: React.ReactNode;
  showProfileCard?: boolean;
  title?: string;
}

export default function Layout({
  children,
  showProfileCard = true,
  title,
}: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // 更新斷點：1200px 用於側邊欄，1500px 用於個人檔案
  const isCompactView = useMediaQuery("(max-width:1920px)");
  const hideProfileSidebar = useMediaQuery("(max-width:1500px)");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(localStorage.getItem("access_token") !== null ? true : false);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileProfileToggle = () => {
    setShowMobileProfile(!showMobileProfile);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: bgColor }}>
      <CssBaseline />

      {/* 導航欄 */}
      <Navbar
        handleDrawerToggle={handleDrawerToggle}
        isCompactView={isCompactView}
        isLogin={isLogin}
      />

      {/* 側邊欄 */}
      <Sidebar
        title={title}
        isMobile={isMobile}
        isCompactView={isCompactView}
        hideProfileSidebar={hideProfileSidebar}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isLogin={isLogin}
      />

      {/* 主要內容區域 + 個人資料卡 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: 8,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 64px)", // 減去頂部導航欄高度
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            gap: { xs: 0, md: 3 },
            flexGrow: 1, // 讓內容區域佔據剩餘空間
          }}
        >
          {/* 主要內容區域 */}
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              mb: showMobileProfile && (isMobile || isTablet) ? 3 : 0,
            }}
          >
            {children}
          </Box>

          {/* 個人資料區域以及在線用戶 - 僅在寬屏 (>1500px) 顯示在右側 */}
          {showProfileCard && !hideProfileSidebar && isLogin && (
            <Box
              sx={{
                width: { sm: "100%", md: profileCardWidth },
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <ProfileSection
                isMobile={isMobile}
                isTablet={isTablet}
                isCompactView={isCompactView}
                hideProfileSidebar={hideProfileSidebar}
                showMobileProfile={showMobileProfile}
                handleMobileProfileToggle={handleMobileProfileToggle}
                profileCardWidth={profileCardWidth}
              />
              {/* 在線用戶列表跟隨在個人檔案下方 */}
              <OnlineUsers />
            </Box>
          )}
        </Box>

        {/* 1500px 以下時，在主內容區域底部顯示在線用戶 */}
        {hideProfileSidebar && isLogin && (
          <Box sx={{ mt: 4, width: "100%" }}>
            <OnlineUsers />
          </Box>
        )}

        {/* 新增貼文按鈕 */}
        <ActionButton />
      </Box>
    </Box>
  );
}
