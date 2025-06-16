import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { useLoading } from "@/lib/context/LoadingContext";
import InteractionBar from "@/components/common/InteractionItem";
import CommentSection from "@/components/common/CommentItem";
import PostAttachments from "@/components/common/Post/PostAttachments";
import {
  Box, Typography, Chip, Avatar, Card,
  Paper, useTheme, Divider, CircularProgress,
  Container, Fade, IconButton
} from "@mui/material";
import { AccessTime, ArrowBack } from "@mui/icons-material";
import PostAPI from "@/services/Post/PostAPI";
import { PostType } from "@/lib/types/postListType";

export default function Post() {
  const router = useRouter();
  const theme = useTheme();
  const { setLoading } = useLoading();
  const [postData, setPostData] = useState<PostType | null>(null);
  const [loading, setLocalLoading] = useState(true);

  const fetchPost = async (id: string) => {
    try {
      setLoading(true);
      const res = await PostAPI.get(Number(id));
      setPostData(res.data || null);
    } catch (err) {
      console.error("取得文章失敗", err);
    } finally {
      setLoading(false);
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchPost(String(router.query.id));
    }
  }, [router.query.id]);

  const handleBack = () => {
    router.back();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading || !postData) {
    return (
      <Layout>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress size={60} thickness={4} color="primary" />
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box mb={2} display="flex" alignItems="center">
          <IconButton onClick={handleBack} sx={{ mr: 1 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="subtitle2" color="text.secondary">
            返回討論列表
          </Typography>
        </Box>

        <Fade in={true} timeout={500}>
          <Card sx={{
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            p: { xs: 2, md: 4 },
            mb: 4
          }}>
            {/* Header */}
            <Box sx={{ borderBottom: "1px solid rgba(0,0,0,0.05)", pb: 3 }}>
              <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                mb: 2
              }}>
                <Link href={`/forum/${postData.boardUrl}`} passHref>
                  <Chip
                    avatar={postData.boardAvatar ? <Avatar src={postData.boardAvatar} /> : null}
                    size="small"
                    label={postData.boardName}
                    clickable
                    sx={{
                      bgcolor: postData.boardColor ? `${postData.boardColor}20` : `${theme.palette.primary.dark}20`,
                      color: postData.boardColor,
                      fontWeight: 600,
                      borderRadius: 1,
                      height: 28,
                      mr: 1,
                      px: 1
                    }}
                  />
                </Link>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.secondary",
                  fontSize: "0.85rem",
                  mt: { xs: 1, sm: 0 }
                }}>
                  <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                  {formatDate(postData.createdAt)}
                </Box>
              </Box>

              <Box sx={{
                display: "flex",
                alignItems: "flex-start",
                mt: 2,
                pb: 1
              }}>
                <Avatar
                  src={postData.authorAvatar || undefined}
                  alt={postData.authorName}
                  sx={{
                    width: 50,
                    height: 50,
                    mr: 2,
                    border: postData.authorGroupColor ? `2px solid ${postData.authorGroupColor}80` : "none"
                  }}
                />
                <Box>
                  {postData.authorGroupName && (
                    <Chip
                      label={postData.authorGroupName}
                      size="small"
                      sx={{
                        mb: 0.5,
                        height: 20,
                        fontSize: "0.7rem",
                        bgcolor: postData.authorGroupColor ? `${postData.authorGroupColor}80` : "rgba(158, 158, 158, 0.5)",
                        color: "#fff",
                        fontWeight: 600
                      }}
                    />
                  )}
                  <Typography variant="subtitle1" fontWeight="bold">
                    {postData.authorName}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  mt: 4,
                  mb: 2,
                  color: "text.primary",
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                  borderLeft: `6px solid ${theme.palette.primary.main}80`,
                  pl: 2
                }}
              >
                {postData.title}
              </Typography>
            </Box>

            {/* Content */}
            <Box my={4}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  bgcolor: "grey.50",
                  border: "1px solid rgba(0,0,0,0.06)"
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: postData.content }}
                  style={{
                    color: theme.palette.text.primary,
                    lineHeight: 1.8
                  }}
                />
              </Paper>
            </Box>

            {/* 附加檔案 */}
            {postData.attachments && postData.attachments.length > 0 && (
              <PostAttachments attachments={postData.attachments} />
            )}

            <Divider sx={{ my: 3 }} />

            {/* Interactions */}
            <InteractionBar
              initialLikes={postData.likesCount}
              initialComments={postData.commentsCount}
              postId={postData.id}
              isLikedA={postData.isLiked}
              isBookmarkedA={postData.isBookmarked}
            />

            {/* Comments */}
            <Box mt={3}>
              <CommentSection postId={postData.id} />
            </Box>
          </Card>
        </Fade>
      </Container>
    </Layout>
  );
}