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
  Container, Fade, IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
  DialogActions,
  DialogContent,
  Button,
  DialogContentText,
  DialogTitle,
  Dialog,
  Alert,
  AlertTitle
} from "@mui/material";
import { AccessTime, ArrowBack, Delete, Edit, MoreHoriz, ErrorOutline } from "@mui/icons-material";
import PostAPI from "@/services/Post/PostAPI";
import { PostType } from "@/lib/types/postListType";
import { toast } from "react-toastify";

export default function Post() {
  const router = useRouter();
  const theme = useTheme();
  const { setLoading } = useLoading();
  const [postData, setPostData] = useState<PostType | null>(null);
  const [loading, setLocalLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isPostDeleted, setIsPostDeleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    router.push(`/forum/${postData?.boardUrl}/post/edit/${postData?.id}`);
    handleClose();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleClose();
  };

  const handleConfirmDelete = async () => {
    try {
      await PostAPI.delete(postData?.id || '');
      setDeleteDialogOpen(false);

      toast.success('文章已成功刪除');

      router.back();
    } catch (error) {
      console.error("刪除文章失敗", error);

      setDeleteDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const fetchPost = async (id: string) => {
    try {
      setLoading(true);
      const res = await PostAPI.get(Number(id));
      setPostData(res.data || null);
      setIsPostDeleted(false);
      setErrorMessage("");
    } catch (err: any) {
      console.error("取得文章失敗", err);

      // 檢查錯誤訊息是否包含文章已被刪除的相關資訊
      const errorMsg = err?.response?.data?.message || err?.message || "";
      if (errorMsg.includes("已被刪除") || errorMsg.includes("不存在") || errorMsg.includes("deleted")) {
        setIsPostDeleted(true);
        setErrorMessage("此文章已被刪除");
      } else {
        setErrorMessage("載入文章時發生錯誤");
      }
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

  if (loading) {
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

  // 如果文章已被刪除，顯示相應的訊息區塊
  if (isPostDeleted) {
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
              p: { xs: 3, md: 4 },
              mb: 4,
              textAlign: "center"
            }}>
              <Alert
                severity="warning"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    fontSize: '2rem'
                  }
                }}
              >
                <AlertTitle sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  文章不存在
                </AlertTitle>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {errorMessage}
                </Typography>
              </Alert>

              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'text.secondary'
              }}>
                <ErrorOutline sx={{
                  fontSize: '4rem',
                  mb: 2,
                  color: 'warning.main',
                  opacity: 0.7
                }} />
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                  很抱歉，您要查看的文章已經不存在
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, maxWidth: '400px' }}>
                  此文章可能已被作者或管理員刪除，或者連結有誤。
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1
                  }}
                >
                  返回上一頁
                </Button>
              </Box>
            </Card>
          </Fade>
        </Container>
      </Layout>
    );
  }

  // 如果有其他錯誤但不是文章被刪除
  if (!postData && errorMessage) {
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
              p: { xs: 3, md: 4 },
              mb: 4,
              textAlign: "center"
            }}>
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                <AlertTitle sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  載入失敗
                </AlertTitle>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {errorMessage}
                </Typography>
              </Alert>

              <Button
                variant="contained"
                onClick={() => fetchPost(String(router.query.id))}
                sx={{ mr: 2 }}
              >
                重新載入
              </Button>
              <Button
                variant="outlined"
                onClick={handleBack}
              >
                返回上一頁
              </Button>
            </Card>
          </Fade>
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
            {postData?.isMine && (
              <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "end" }}>
                <IconButton
                  onClick={handleClick}
                  aria-controls={open ? 'post-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <MoreHoriz />
                </IconButton>
                <Menu
                  id="post-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'post-button',
                  }}
                >
                  <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                      <Edit sx={{ color: '#1d3557' }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>編輯</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                      <Delete sx={{ color: '#c1121f' }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>刪除</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            )}
            {/* Header */}
            <Box sx={{ borderBottom: "1px solid rgba(0,0,0,0.05)", pb: 3 }}>
              <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                mb: 2
              }}>
                <Link href={`/forum/${postData?.boardUrl}`} passHref>
                  <Chip
                    avatar={postData?.boardAvatar ? <Avatar src={postData.boardAvatar} /> : null}
                    size="small"
                    label={postData?.boardName}
                    clickable
                    sx={{
                      bgcolor: postData?.boardColor ? `${postData.boardColor}20` : `${theme.palette.primary.dark}20`,
                      color: postData?.boardColor,
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
                  {formatDate(postData?.createdAt || '')}
                </Box>
              </Box>

              <Box sx={{
                display: "flex",
                alignItems: "flex-start",
                mt: 2,
                pb: 1
              }}>
                <Avatar
                  src={postData?.authorAvatar || undefined}
                  alt={postData?.authorName}
                  sx={{
                    width: 50,
                    height: 50,
                    mr: 2,
                    border: postData?.authorGroupColor ? `2px solid ${postData.authorGroupColor}80` : "none"
                  }}
                />
                <Box>
                  {postData?.authorGroupName && (
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
                    {postData?.authorName}
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
                {postData?.title}
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
                  dangerouslySetInnerHTML={{ __html: postData?.content || '' }}
                  style={{
                    color: theme.palette.text.primary,
                    lineHeight: 1.8
                  }}
                />
              </Paper>
            </Box>

            {/* 附加檔案 */}
            {postData?.attachments && postData.attachments.length > 0 && (
              <PostAttachments attachments={postData.attachments} />
            )}

            <Divider sx={{ my: 3 }} />

            {/* Interactions */}
            <InteractionBar
              initialLikes={postData?.likesCount || 0}
              initialComments={postData?.commentsCount || 0}
              initialBookmarked={postData?.bookmarksCount || 0}
              postId={postData?.id || ''}
              isLikedA={postData?.isLiked || false}
              isBookmarkedA={postData?.isBookmarked || false}
            />

            {/* Comments */}
            <Box mt={3}>
              <CommentSection postId={postData?.id || ''} />
            </Box>
          </Card>
        </Fade>
      </Container>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(193, 18, 31, 0.15)',
            background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
          }
        }}
        BackdropProps={{
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }
        }}
      >
        <DialogTitle
          id="delete-dialog-title"
          sx={{
            pb: 2,
            pt: 3,
            background: 'linear-gradient(135deg, #fff5f5 0%, #fee2e2 100%)',
            borderBottom: '1px solid rgba(193, 18, 31, 0.1)'
          }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
            <Box sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c1121f 0%, #dc2626 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              boxShadow: '0 8px 24px rgba(193, 18, 31, 0.3)',
              animation: 'pulse 2s infinite'
            }}>
              <Delete sx={{
                fontSize: 32,
                color: 'white',
              }} />
            </Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: '#c1121f',
                fontWeight: 600,
                fontSize: '1.4rem'
              }}
            >
              確認刪除文章
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{
          px: 4,
          py: 3,
          textAlign: 'center'
        }}>
          <DialogContentText
            id="delete-dialog-description"
            sx={{
              fontSize: '1.1rem',
              color: '#6b7280',
              lineHeight: 1.6,
              mb: 1
            }}
          >
            您確定要刪除這篇文章嗎？
          </DialogContentText>
          <DialogContentText
            sx={{
              fontSize: '0.9rem',
              color: '#9ca3af',
              fontStyle: 'italic'
            }}
          >
            此操作無法復原，請謹慎考慮。
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{
          px: 4,
          pb: 4,
          pt: 2,
          gap: 2,
          justifyContent: 'center'
        }}>
          <Button
            onClick={handleCancelDelete}
            variant="outlined"
            size="large"
            sx={{
              minWidth: 120,
              height: 48,
              borderRadius: '12px',
              borderColor: '#e5e7eb',
              color: '#6b7280',
              fontWeight: 500,
              '&:hover': {
                borderColor: '#d1d5db',
                backgroundColor: '#f9fafb',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease'
            }}
          >
            取消
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            size="large"
            startIcon={<Delete />}
            sx={{
              minWidth: 120,
              height: 48,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #c1121f 0%, #dc2626 100%)',
              fontWeight: 600,
              boxShadow: '0 4px 16px rgba(193, 18, 31, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #a11018 0%, #b91c1c 100%)',
                boxShadow: '0 6px 20px rgba(193, 18, 31, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease'
            }}
          >
            確認刪除
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}