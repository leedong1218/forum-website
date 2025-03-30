import React from 'react';
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
  Visibility,
} from "@mui/icons-material";
import { PostType } from "@/lib/types/postListType";

interface PostListItemProps {
  post: PostType;
  getCategoryColor: (category: string) => { bg: string; text: string };
}

const PostListItem: React.FC<PostListItemProps> = ({ post, getCategoryColor }) => {
  const categoryColor = getCategoryColor(post.category);

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
        href={`/f/1/p/${post.id}`}
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Avatar
              sx={{
                width: 30,
                height: 30,
                bgcolor: categoryColor.text,
                fontSize: "1.2rem",
                mr: 2,
                fontWeight: 600,
              }}
            >
              {post.avatar}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 0.5,
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    mr: 1.5,
                  }}
                >
                  {post.author}
                </Typography>

                <Chip
                  size="small"
                  label={post.category}
                  sx={{
                    backgroundColor: categoryColor.bg,
                    color: categoryColor.text,
                    fontWeight: 600,
                    borderRadius: 1.5,
                    px: 1,
                    height: 24,
                    mr: 1,
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "text.secondary",
                    fontSize: "0.75rem",
                    ml: "auto",
                    flexShrink: 0,
                  }}
                >
                  <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                  {post.timestamp}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    color: "#1e293b",
                    fontSize: "1.1rem",
                    mr: 1.5,
                  }}
                >
                  {post.title}
                </Typography>
              </Box>

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
                {post.description}
              </Typography>

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
                    {post.likes}
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
                    {post.comments}
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
                    {post.bookmarks}
                  </Box>
                </Box>

                {/* View count */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "text.secondary",
                    fontSize: "0.75rem",
                  }}
                >
                  <Visibility sx={{ fontSize: 16, mr: 0.5 }} />
                  {post.views}
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