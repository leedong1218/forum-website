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
  ChatBubbleOutline,
  FavoriteBorder,
} from '@mui/icons-material';
import Link from 'next/link';

export type PostTypes = {
  id: number;
  title: string;
  description: string;
  category: string;
  timestamp: string;
  likes: number;
  comments: number;
  views: number;
  boardUrl: string;
  content: string;
  boardColor?: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  boardName: string;
}

interface PostListProps {
  posts: PostTypes[];
}

export default function PostList({ posts }: PostListProps) {
  if (!posts || posts.length === 0) {
    return (
      <Box sx={{
        textAlign: 'center',
        py: 6,
        color: 'text.secondary'
      }}>
        <Typography variant="h6" gutterBottom>
          尚無發布的文章
        </Typography>
        <Typography variant="body2">
          開始創作您的第一篇文章吧！
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%", p: 0 }}>
      {posts.map((post) => (
        <Card
          component={Link}
          href={`/forum/${post.boardUrl}/post/${post.id}`}
          key={post.id}
          sx={{
            textDecoration: 'none', // 👉 移除底線
            '&:hover': {
              textDecoration: 'none', // 👉 滑鼠移上時也不要出現底線
            }
          }}
        >
          <CardContent sx={{
            p: 3,
            mb: 2,
            border: "1px solid #e5e7eb",
            borderRadius: 2,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
            },
            cursor: "pointer",
          }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", mb: 2, alignItems: "center" }}>
                <Chip
                  size="small"
                  label={post.boardName}
                  sx={{
                    backgroundColor: post.boardColor,
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: "0.75rem",
                  }}
                />

                {/* Title */}
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.125rem",
                    color: "#111827",
                    lineHeight: 1.4,
                    ml: 1,
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
                {new Date(post.createdAt).toLocaleDateString()}
              </Box>
            </Box>

            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Stats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pt: 2,
                mt: 1,
                borderTop: "1px solid #ccc",
              }}
            >
              <Box sx={{ display: "flex", gap: 3 }}>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#6b7280",
                  fontSize: "0.875rem"
                }}>
                  <FavoriteBorder sx={{ fontSize: 16, mr: 0.5 }} />
                  {post.likesCount}
                </Box>

                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#6b7280",
                  fontSize: "0.875rem"
                }}>
                  <ChatBubbleOutline sx={{ fontSize: 16, mr: 0.5 }} />
                  {post.commentsCount}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </List>
  );
}