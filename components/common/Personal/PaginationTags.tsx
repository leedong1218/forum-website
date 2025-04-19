import { SetStateAction, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import { TabPanelProps } from '@/lib/types/userProfileType';
import PostList from './PostList';
import BoardList from './BoardList';

// Tab panel component to display content for each tab
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function PaginationTags() {
  const [tabValue, setTabValue] = useState(0);

  const accentColor = '#1976d2'; // Using MUI's default primary blue, adjust as needed

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTabChange = (event: any, newValue: SetStateAction<number>) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{
      width: '100%', bgcolor: '#fff', border: '1px solid rgba(0,0,0,0.08)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderRadius: 3
    }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTabs-indicator": {
              backgroundColor: accentColor,
              height: 3,
              borderRadius: "3px 3px 0 0",
            },
          }}
        >
          <Tab
            icon={<ArticleIcon />}
            iconPosition="start"
            label="發布的文章"
            sx={{
              textTransform: "none",
              fontWeight: tabValue === 0 ? 600 : 400,
              fontSize: "0.95rem",
              color: tabValue === 0 ? accentColor : "text.secondary",
              minHeight: 56,
            }}
          />
          <Tab
            icon={<BookmarkIcon />}
            iconPosition="start"
            label="追蹤的看板"
            sx={{
              textTransform: "none",
              fontWeight: tabValue === 1 ? 600 : 400,
              fontSize: "0.95rem",
              color: tabValue === 1 ? accentColor : "text.secondary",
              minHeight: 56,
            }}
          />
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            label="設定"
            sx={{
              textTransform: "none",
              fontWeight: tabValue === 2 ? 600 : 400, // Changed from 3 to 2 to match tab index
              fontSize: "0.95rem",
              color: tabValue === 2 ? accentColor : "text.secondary", // Changed from 3 to 2
              minHeight: 56,
            }}
          />
        </Tabs>
      </Box>

      {/* Content for each tab */}
      <TabPanel value={tabValue} index={0}>
        {/* 發布的文章 content */}
        <Box>
          <PostList />
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* 追蹤的看板 content */}
        <Box sx={{ typography: 'body1' }}>
          <BoardList />
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ minHeight: '400px' }}>
          {/* 設定 content */}
          <Box sx={{ typography: 'body1' }}>
            用戶設定頁面。
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
}