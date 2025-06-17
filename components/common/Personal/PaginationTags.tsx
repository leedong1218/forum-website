import { SetStateAction, useEffect, useState } from 'react';
import { Box, Tab, Tabs, CircularProgress, Alert } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import { TabPanelProps } from '@/lib/types/userProfileType';
import PostList, { PostTypes } from './PostList';
import BoardList from './BoardList';
import UserAPI from '@/services/User/UserAPI';

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

export default function PaginationTags({ userId }: { userId: string }) {
  const [tabValue, setTabValue] = useState(0);
  const [posts, setPosts] = useState<PostTypes[]>([]);
  const [follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accentColor = '#1976d2';

  const fetchData = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const [postsRes, followsRes] = await Promise.all([
        UserAPI.activity(userId, 'posts', 1),
        UserAPI.activity(userId, 'follows', 1)
      ]);

      console.log('API Response:', { postsRes, followsRes });

      // 確保返回的數據格式正確
      if (postsRes?.data) {
        // 如果 API 返回的是包含 posts 數組的對象
        const postsData = Array.isArray(postsRes.data) ? postsRes.data : postsRes.data.results || [];
        setPosts(postsData);
      }

      if (followsRes?.data) {
        const followsData = Array.isArray(followsRes.data) ? followsRes.data : followsRes.data.results || [];
        setFollows(followsData);
      }

    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('載入數據時發生錯誤，請稍後重試');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData(userId);
    }
  }, [userId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTabChange = (event: any, newValue: SetStateAction<number>) => {
    setTabValue(newValue);
  };

  const handleRetry = () => {
    fetchData(userId);
  };

  return (
    <Box sx={{
      width: '100%',
      bgcolor: '#fff',
      border: '1px solid rgba(0,0,0,0.08)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      borderRadius: 3
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
              fontWeight: tabValue === 2 ? 600 : 400,
              fontSize: "0.95rem",
              color: tabValue === 2 ? accentColor : "text.secondary",
              minHeight: 56,
            }}
          />
        </Tabs>
      </Box>

      {/* Error handling */}
      {error && (
        <Box sx={{ p: 3 }}>
          <Alert
            severity="error"
            action={
              <button onClick={handleRetry} style={{ marginLeft: '8px' }}>
                重試
              </button>
            }
          >
            {error}
          </Alert>
        </Box>
      )}

      {/* Loading state */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Content for each tab */}
      {!loading && !error && (
        <>
          <TabPanel value={tabValue} index={0}>
            <Box>
              <PostList posts={posts} />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ typography: 'body1' }}>
              <BoardList follows={follows} />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ minHeight: '400px' }}>
              <Box sx={{ typography: 'body1' }}>
                用戶設定頁面。
              </Box>
            </Box>
          </TabPanel>
        </>
      )}
    </Box>
  );
}