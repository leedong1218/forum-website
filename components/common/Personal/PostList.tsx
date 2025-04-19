import {
  List,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import {
  AccessTime,
  Favorite,
  ChatBubbleOutline,
  Bookmark,
  Visibility
} from '@mui/icons-material';
import Link from 'next/link';
import { posts } from '@/lib/data/personal/detail';

export default function PostList() {
  return (
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
            <CardContent sx={{ py: 1 }}>
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
                      backgroundColor: post.bg,
                      // color: post.text,
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                  pt: 2,
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <Box sx={{ display: "flex", gap: 3 }}>
                  {/* 點讚數量 */}
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    color: "text.secondary",
                    fontSize: "0.75rem" 
                  }}>
                    <Favorite sx={{ fontSize: 14, mr: 0.5, color: "#f43f5e" }} />
                    {post.likes}
                  </Box>
                  
                  {/* 評論數量 */}
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    color: "text.secondary",
                    fontSize: "0.75rem" 
                  }}>
                    <ChatBubbleOutline sx={{ fontSize: 14, mr: 0.5 }} />
                    {post.comments}
                  </Box>
                  
                  {/* 收藏數量 */}
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    color: "text.secondary",
                    fontSize: "0.75rem" 
                  }}>
                    <Bookmark sx={{ fontSize: 14, mr: 0.5 }} />
                    {post.bookmarks}
                  </Box>
                </Box>

                {/* 檢視次數 */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "text.secondary",
                    fontSize: "0.75rem",
                  }}
                >
                  <Visibility sx={{ fontSize: 16, mr: 0.5 }} />
                  {post.views.toLocaleString()}
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </List>
  );
}