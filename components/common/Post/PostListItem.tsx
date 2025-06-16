import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  TurnedInNot,
  AccessTime,
} from "@mui/icons-material";
import { PostType } from "@/lib/types/postListType";

interface PostListItemProps {
  post: PostType;
  getCategoryColor: (category: string) => { bg: string; text: string };
}

// 工具：移除 HTML、限制字數
const getTextPreview = (html: string, maxLength = 60): string => {
  const text = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const PostListItem: React.FC<PostListItemProps> = ({ post, getCategoryColor }) => {
  const categoryColor = getCategoryColor(post.boardUrl);
  const textPreview = getTextPreview(post.content);

  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
        },
        border: "1px solid #eaeaea",
        backgroundColor: "#fff",
        overflow: "hidden",
        mb: 2,
        position: "relative",
      }}
    >
      <Box
        component={Link}
        href={`/forum/${post.boardUrl}/post/${post.id}`}
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* 頂部區域 - 包含版區信息 */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              {post.boardAvatar ? (
                <Chip
                  avatar={<Avatar src={post.boardAvatar} />}
                  size="small"
                  label={post.boardName}
                  clickable
                  sx={{
                    backgroundColor: categoryColor.bg,
                    color: categoryColor.text,
                    fontWeight: 600,
                    borderRadius: 1,
                    height: 28,
                    px: 1
                  }}
                />
              ) : (
                <Chip
                  size="small"
                  label={post.boardName}
                  clickable
                  sx={{
                    backgroundColor: categoryColor.bg,
                    color: categoryColor.text,
                    fontWeight: 600,
                    borderRadius: 1,
                    height: 28,
                    px: 1
                  }}
                />
              )}
            
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
                fontSize: "0.75rem",
              }}
            >
              <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
              {new Date(post.createdAt).toLocaleDateString()}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            {/* 作者頭像 */}
            <Avatar
              src={post.authorAvatar || undefined}
              sx={{
                width: 40,
                height: 40,
                bgcolor: categoryColor.text,
                fontSize: "1.2rem",
                mr: 2,
                fontWeight: 600,
              }}
            >
              {!post.authorAvatar && post.authorName?.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              {/* 作者名稱 */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  mb: 0.5,
                }}
              >
                {post.authorName}
              </Typography>

              {/* 標題 */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  color: "#1e293b",
                  fontSize: "1.1rem",
                  mb: 1,
                }}
              >
                {post.title}
              </Typography>

              {/* 內容預覽 */}
              <Typography
                variant="body2"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.6,
                  color: "#64748b",
                  mb: 1.5,
                  pr: { xs: 0, sm: 8 },
                }}
              >
                {textPreview}
              </Typography>

              {/* 帖子統計信息 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pt: 2,
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  mt: "auto",
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                      fontSize: "0.75rem",
                    }}
                  >
                    <FavoriteBorder sx={{ fontSize: 16, mr: 0.5 }} />
                    {post.likesCount ?? 0}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                      fontSize: "0.75rem",
                    }}
                  >
                    <ChatBubbleOutline sx={{ fontSize: 16, mr: 0.5 }} />
                    {post.commentsCount ?? 0}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                      fontSize: "0.75rem",
                    }}
                  >
                    <TurnedInNot sx={{ fontSize: 16, mr: 0.5 }} />
                    {post.bookmarksCount ?? 0}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PostListItem;