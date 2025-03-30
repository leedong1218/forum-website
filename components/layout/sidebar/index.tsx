import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

// 引入側邊欄的子組件
import MainNavItems from "./MainNavItems";
import FollowedBoards from "./FollowedBoards";
import SimplifiedProfile from "./SimplifiedProfile";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// 側邊欄寬度
const drawerWidth = 270;

// 卡片背景色
const cardBgColor = "#ffffff"; // White for cards

interface SidebarProps {
  title?: string;
  isMobile: boolean;
  isCompactView: boolean;
  hideProfileSidebar: boolean; // 新增此屬性以檢查是否在 1500px 以下
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  title,
  isMobile,
  isCompactView,
  hideProfileSidebar,
  mobileOpen,
  handleDrawerToggle
}) => {
  // 側邊欄內容
  const drawerContent = (
    <Box sx={{ 
      overflow: "auto", 
      px: 2, 
      py: 3,
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }}>
      {/* 關閉按鈕 - 僅在行動裝置或壓縮視圖時顯示 */}
      {(isMobile || isCompactView) && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {/* 主要導航項目 */}
      <MainNavItems 
        title={title} 
        isMobile={isMobile} 
        isCompactView={isCompactView} 
        handleDrawerToggle={handleDrawerToggle} 
      />

      {/* 已追蹤的看板 */}
      <FollowedBoards 
        title={title} 
        isMobile={isMobile} 
        isCompactView={isCompactView} 
        handleDrawerToggle={handleDrawerToggle} 
      />

      {/* 在壓縮視圖下 (1200px) 或寬度 1500px 以下時，在側邊欄底部顯示簡化的個人資料 */}
      {(isCompactView || hideProfileSidebar) && <SimplifiedProfile />}
    </Box>
  );

  return (
    <>
      {/* 桌面版 - 永久抽屜 (僅在非壓縮視圖時顯示) */}
      {!isMobile && !isCompactView && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: cardBgColor,
              borderRight: "1px solid rgba(0,0,0,0.08)",
            },
          }}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>
      )}

      {/* 臨時抽屜 - 用於行動裝置和壓縮視圖 */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // 更好的行動裝置性能
        }}
        sx={{
          // 在行動裝置和壓縮視圖中顯示
          display: { xs: 'block', sm: isCompactView ? 'block' : 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: cardBgColor,
            borderRight: "1px solid rgba(0,0,0,0.08)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;