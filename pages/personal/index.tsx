import Layout from "@/components/layout/Layout";
import {
  Box,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
} from "@mui/material";
import { useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  TurnedInNot,
} from "@mui/icons-material";

const posts = [
  {
    id: 1,
    title: "Quantum Computing Breakthroughs",
    description:
      "Discussing the latest advancements in quantum computing and their implications for cybersecurity.Discussing the latest advancements in quantum computing and their implications for cybersecurity.",
    author: "TechExplorer",
    avatar: "T",
    category: "Technology",
    comments: 42,
    views: 1287,
    timestamp: "2 hours ago",
    link: "/post",
  },
  {
    id: 2,
    title: "AI Model Architecture Design",
    description:
      "Share your experiences with different AI model architectures and optimization techniques.",
    author: "DataScientist",
    avatar: "D",
    category: "AI & ML",
    comments: 28,
    views: 956,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    title: "Future of Web Development",
    description:
      "Exploring emerging technologies that will shape the future of web applications.",
    author: "CodeCrafter",
    avatar: "C",
    category: "Development",
    comments: 36,
    views: 1105,
    timestamp: "8 hours ago",
  },
];

export default function Personal() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: unknown, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Layout showProfileCard={false}>
      {/* 上半部區塊：背景照、大頭照、暱稱等 */}
      <Box
        sx={{
          width: "100%",
          mb: 4,
          borderRadius: 2,
          background: "#fff",
          border: "1px solid rgba(25,118,210,0.2)",
          overflow: "hidden",
        }}
      >
        {/* 背景照片 */}
        <Box
          sx={{
            height: 200,
            backgroundImage: "url('/api/placeholder/1000/300')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        />

        {/* 個人資訊區域 */}
        <Box sx={{ p: 4, pt: 0, position: "relative" }}>
          {/* 大頭照 */}
          <Avatar
            sx={{
              width: 120,
              height: 120,
              border: "4px solid white",
              position: "relative",
              top: -60,
              marginBottom: -8,
            }}
            src="/api/placeholder/200/200"
            alt="Profile Picture"
          />

          {/* 暱稱與簡短介紹 */}
          <Typography variant="h4" sx={{ mt: 2 }}>
            張小明
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            @xiaoming
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
            喜歡分享心得和閱讀各種有趣的討論。加入日期：2023年3月
          </Typography>

          {/* 追蹤數據 */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              mb: 2,
            }}
          >
            <Typography variant="body2">
              <strong>142</strong> 追蹤者
            </Typography>
            <Typography variant="body2">
              <strong>98</strong> 正在追蹤
            </Typography>
            <Typography variant="body2">
              <strong>56</strong> 文章
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 下半部區塊：分頁內容 */}
      <Box
        sx={{
          width: "100%",
          borderRadius: 2,
          background: "#fff",
          border: "1px solid rgba(25,118,210,0.2)",
          overflow: "hidden",
        }}
      >
        {/* 分頁標籤 */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab icon={<ArticleIcon />} label="發布的文章" />
          <Tab icon={<BookmarkIcon />} label="追蹤的看板" />
          <Tab icon={<PersonIcon />} label="個人資訊" />
          <Tab icon={<SettingsIcon />} label="設定" />
        </Tabs>

        {/* 發布的文章 */}
        <TabPanel value={tabValue} index={0}>
          <List sx={{ width: "100%" }}>
            {posts.map((post, index) => (
              <Box
                key={index}
                sx={{
                  mb:2,
                  p: 1,
                  borderRadius: 2,
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      size="small"
                      label={post.category}
                      sx={{
                        backgroundColor: "rgba(25,118,210,0.1)",
                        color: "#1976d2",
                        fontWeight: 500,
                        borderRadius: 1,
                        mr: 2,
                      }}
                    />

                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ fontWeight: 600 }}
                    >
                      {post.title}
                    </Typography>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    {post.timestamp}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <FavoriteBorder sx={{ mr: 0.5 }} />
                      {post.comments}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ChatBubbleOutline sx={{ mr: 0.5 }} />
                      {post.comments}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <TurnedInNot sx={{ mr: 0.5 }} />
                      {post.comments}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              //   <Box
              //     key={index}
              //     sx={{
              //       width: "100%",
              //       mb: 4,
              //       p: 4,
              //       borderRadius: 2,
              //       background: "#fff",
              //       border: "1px solid rgba(25,118,210,0.2)",
              //     }}
              //   >
              //     <Typography
              //       sx={{ display: "inline" }}
              //       component="span"
              //       variant="body2"
              //       color="text.primary"
              //     >
              //      {item.description}
              //     </Typography>
              //     {/* <Divider variant="inset" component="li" /> */}
              //   </Box>
            ))}
          </List>
        </TabPanel>

        {/* 追蹤的看板 */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Typography variant="h6">看板名稱 {item}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    這是看板{item}的簡短描述，關於這個看板的內容主題。
                  </Typography>
                  <Box
                    sx={{ mt: "auto", display: "flex", alignItems: "center" }}
                  >
                    <Typography variant="caption" sx={{ flexGrow: 1 }}>
                      {item * 1000} 成員
                    </Typography>
                    <Button size="small" variant="outlined">
                      已追蹤
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* 個人資訊 */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="真實姓名" secondary="張小明" />
              </ListItem>
              <Divider variant="inset" component="li" />

              <ListItem>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="個人簡介"
                  secondary="喜歡分享生活點滴，關注科技和設計相關話題。平時喜歡閱讀和戶外活動。"
                />
              </ListItem>
              <Divider variant="inset" component="li" />

              <ListItem>
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText
                  primary="興趣愛好"
                  secondary="科技、閱讀、攝影、旅行"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button variant="contained">編輯個人資訊</Button>
            </Box>
          </Box>
        </TabPanel>

        {/* 設定 */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <List>
              <ListItem>
                <ListItemText
                  primary="帳號設定"
                  secondary="管理您的帳號和登入資訊"
                />
              </ListItem>
              <Divider component="li" />

              <ListItem>
                <ListItemText
                  primary="隱私設定"
                  secondary="控制誰可以看到您的資料和活動"
                />
              </ListItem>
              <Divider component="li" />

              <ListItem>
                <ListItemText
                  primary="通知設定"
                  secondary="自訂您想接收的通知類型"
                />
              </ListItem>
              <Divider component="li" />

              <ListItem>
                <ListItemText
                  primary="顯示與語言"
                  secondary="調整界面外觀和語言偏好"
                />
              </ListItem>
              <Divider component="li" />
            </List>
          </Box>
        </TabPanel>
      </Box>
    </Layout>
  );
}

type Props = {
  children: React.ReactNode;
  value: number;
  index: number;
};

function TabPanel(props: Props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ padding: 16 }}
    >
      {value === index && children}
    </div>
  );
}
