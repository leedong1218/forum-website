import { AccessTime, Article, Bookmark, Email, Forum, Groups, Lock, Security, Settings } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, Chip, Grid, Link, List, ListItem, ListItemIcon, ListItemText, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import TabPanel from "./TabPanel";
import { boards, posts } from "@/lib/data/personal/detail";

export default function Detail() {
  const [tabValue, setTabValue] = useState(0);

  const accentColor = "#0ea5e9"; // 主藍色
  const accentColorLight = "#e0f2fe"; // 淺藍背景色
  const accentColorDark = "#0284c7"; // 深藍色

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 3,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      {/* 分頁標籤 */}
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
          icon={<Article />}
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
          icon={<Bookmark />}
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
          icon={<Settings />}
          iconPosition="start"
          label="設定"
          sx={{
            textTransform: "none",
            fontWeight: tabValue === 3 ? 600 : 400,
            fontSize: "0.95rem",
            color: tabValue === 3 ? accentColor : "text.secondary",
            minHeight: 56,
          }}
        />
      </Tabs>

      {/* 發布的文章 */}
      <TabPanel value={tabValue} index={0}>
        <List sx={{ width: "100%" }}>
          {posts.map((post, index) => {
            return (
              <Card
                component={Link}
                href={post.link || `/post/${post.id}`}
                key={index}
                sx={{
                  mb: 3,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                  },
                  border: "1px solid #f0f0f0",
                  textDecoration: "none",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        size="small"
                        label={post.category}
                        sx={{
                          backgroundColor: "beige",
                          color: '#000',
                          fontWeight: 600,
                          borderRadius: 1.5,
                          fontSize: "0.75rem",
                          height: 24,
                          mr: 2,
                        }}
                      />

                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          color: "#1e293b",
                        }}
                      >
                        {post.title}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                        fontSize: "0.75rem",
                      }}
                    >
                      <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                      {post.timestamp}
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#64748b",
                      lineHeight: 1.6,
                    }}
                  >
                    {post.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </List>
      </TabPanel>

      {/* 追蹤的看板 */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {boards.map((board) => (
            <Grid item xs={12} sm={6} md={3} key={board.id}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
                    borderColor: "rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    pb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: board.color,
                        fontWeight: 600,
                        mr: 1.5,
                        width: 40,
                        height: 40,
                      }}
                    >
                      {board.icon}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, lineHeight: 1.2 }}
                      >
                        {board.name}
                      </Typography>
                      <Chip
                        label={`活躍度: ${board.activityLevel}`}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.65rem",
                          bgcolor:
                            board.activityLevel === "高"
                              ? "#dcfce7"
                              : "#fef3c7",
                          color:
                            board.activityLevel === "高"
                              ? "#16a34a"
                              : "#d97706",
                          fontWeight: 600,
                          mt: 0.5,
                        }}
                      />
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flexGrow: 1,
                    }}
                  >
                    {board.description}
                  </Typography>

                  <Box
                    sx={{ pt: 2, borderTop: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          fontWeight: 500,
                        }}
                      >
                        <Groups sx={{ mr: 0.5, fontSize: 14 }} />
                        {board.members.toLocaleString()} 成員
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          fontWeight: 500,
                        }}
                      >
                        <Forum sx={{ mr: 0.5, fontSize: 14 }} />
                        {board.posts.toLocaleString()} 文章
                      </Typography>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        bgcolor: board.isFollowing
                          ? "transparent"
                          : accentColor,
                        color: board.isFollowing ? "text.secondary" : "white",
                        border: board.isFollowing
                          ? "1px solid rgba(0,0,0,0.12)"
                          : "none",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          bgcolor: board.isFollowing
                            ? "rgba(0,0,0,0.04)"
                            : accentColorDark,
                        },
                      }}
                    >
                      {board.isFollowing ? "已追蹤" : "追蹤"}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* 設定 */}
      <TabPanel value={tabValue} index={3}>
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              p: 3,
              mb: 3,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Security sx={{ mr: 1, color: accentColor }} />
              帳號與安全
            </Typography>

            <List disablePadding>
              <ListItem
                sx={{
                  mb: 1,
                  py: 2,
                  px: 3,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.02)",
                  },
                  transition: "background-color 0.2s",
                }}
              >
                <ListItemIcon>
                  <Lock sx={{ color: accentColor }} />
                </ListItemIcon>
                <ListItemText
                  primary="密碼設定"
                  secondary="更改您的密碼和安全性設定"
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 6,
                    textTransform: "none",
                    borderColor: accentColor,
                    color: accentColor,
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: accentColorDark,
                      bgcolor: accentColorLight,
                    },
                  }}
                >
                  修改
                </Button>
              </ListItem>

              <ListItem
                sx={{
                  mb: 1,
                  py: 2,
                  px: 3,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.02)",
                  },
                  transition: "background-color 0.2s",
                }}
              >
                <ListItemIcon>
                  <Email sx={{ color: accentColor }} />
                </ListItemIcon>
                <ListItemText
                  primary="電子郵件設定"
                  secondary="更改或驗證您的電子郵件地址"
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 6,
                    textTransform: "none",
                    borderColor: accentColor,
                    color: accentColor,
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: accentColorDark,
                      bgcolor: accentColorLight,
                    },
                  }}
                >
                  修改
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Box>
      </TabPanel>
    </Box>
  )
}