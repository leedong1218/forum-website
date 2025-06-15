// CommentSection.tsx (整合 Toast + 隱藏回覆 + 美化版本 + 無限滾動)

import { useState, useEffect, useCallback } from "react";
import {
  Box, Typography, TextField, Button, Divider, IconButton, Collapse, Avatar, Snackbar, Alert,
  Paper, Stack, Chip, CircularProgress,
  Tooltip
} from "@mui/material";
import {
  FavoriteBorder, Favorite, Reply, ExpandMore, ExpandLess, DeleteOutline, EditOutlined,
  Warning
} from "@mui/icons-material";
import Sticker from "@/public/images/sticker.jpg";
import { commentType } from "@/lib/types/commentType";
import CommentAPI from "@/services/Comment/CommentAPI";
import { ReportDialog } from "./ReportPopup";
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll'; // 調整路徑根據你的項目結構

const CommentItem = ({
  comment,
  replies,
  onReply,
  onSubmit,
  onDelete,
  onRefresh,
  activeReplyId,
  cancelReply,
  showRepliesInitially = false
}: {
  comment: commentType;
  replies: commentType[];
  onReply: (id: number) => void;
  onSubmit: (parentId: number, content: string) => void;
  onDelete: (id: number) => void;
  onRefresh: () => void;
  activeReplyId: number | null;
  cancelReply: () => void;
  showRepliesInitially?: boolean;
}) => {
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(showRepliesInitially);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [reportDialogOpen, setReportDialogOpen] = useState<boolean>(false);

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onSubmit(comment.id, replyText);
      setReplyText("");
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const timeSince = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " 年前";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " 個月前";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " 天前";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " 小時前";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " 分鐘前";
    return "剛剛";
  };

  const handleOpenReport = () => {
    setReportDialogOpen(true);
  }

  const handleCloseReport = () => {
    setReportDialogOpen(false);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2.5,
        pl: comment.parentId ? 2 : 0,
        borderLeft: comment.parentId ? '2px solid #eee' : 'none',
        bgcolor: 'transparent'
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar sx={{ width: 40, height: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={comment.authorAvatar || Sticker}
            alt={comment.authorName}
            style={{ objectFit: 'cover' }}
          />
        </Avatar>
        <Box flex={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography
                  fontWeight={600}
                  sx={{ color: comment.authorGroupColor || 'inherit' }}
                >
                  {comment.authorName}
                </Typography>
                <Chip
                  label={comment.authorGroupName || "用戶"}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    bgcolor: comment.authorGroupColor ? `${comment.authorGroupColor}20` : '#3c80c320',
                    color: comment.authorGroupColor || '#3c80c3',
                    fontWeight: 500,
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }}
                />
              </Stack>
              <IconButton
                size="small"
                onClick={toggleLike}
                sx={{ p: 0.5, ml: -0.5 }}
              >
                {liked ?
                  <Favorite fontSize="small" color="error" /> :
                  <FavoriteBorder fontSize="small" />
                }
                {likeCount > 0 &&
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    {likeCount}
                  </Typography>
                }
              </IconButton>
              <Tooltip title={"檢舉"}>
                <IconButton
                  size="small"
                  onClick={handleOpenReport}
                  sx={{ p: 0.5, ml: -0.5 }}
                >
                  <Warning fontSize="small" color="warning" />
                </IconButton>
              </Tooltip>
            </Stack>
            <Typography variant="caption" color="text.secondary">{timeSince(comment.createdAt)}</Typography>
          </Box>

          {isEditing ? (
            <TextField
              fullWidth
              multiline
              size="small"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              sx={{ my: 1 }}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: comment.isLocked ? 'text.disabled' : 'text.primary',
                fontStyle: comment.isLocked ? 'italic' : 'normal',
                mt: 1,
                mb: 1,
                lineHeight: 1.6
              }}
            >
              {comment.isLocked ? '此留言已被刪除' : comment.content}
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!comment.isLocked && (
              <Button
                size="small"
                onClick={() => onReply(comment.id)}
                startIcon={<Reply fontSize="small" />}
                sx={{
                  textTransform: 'none',
                  color: 'text.secondary',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                回覆
              </Button>
            )}
            {comment.isMine && !comment.isLocked && (
              isEditing ? (
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    onClick={() => setIsEditing(false)}
                    sx={{ textTransform: 'none' }}
                  >
                    取消
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={async () => {
                      if (!editText.trim()) return;
                      await CommentAPI.update(comment.id, editText);
                      setIsEditing(false);
                      onRefresh();
                    }}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 1.5
                    }}
                  >
                    儲存
                  </Button>
                </Stack>
              ) : (
                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    size="small"
                    onClick={() => setIsEditing(true)}
                    sx={{ color: 'text.secondary' }}
                  >
                    <EditOutlined fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(comment.id)}
                    sx={{ color: 'text.secondary' }}
                  >
                    <DeleteOutline fontSize="small" />
                  </IconButton>
                </Stack>
              )
            )}
          </Box>

          {activeReplyId === comment.id && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="回覆內容..."
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              <Box sx={{ mt: 1, textAlign: 'right' }}>
                <Button
                  size="small"
                  onClick={cancelReply}
                  sx={{ mr: 1, textTransform: 'none' }}
                >
                  取消
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleReplySubmit}
                  disabled={!replyText.trim()}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 1.5
                  }}
                >
                  送出
                </Button>
              </Box>
            </Box>
          )}

          {replies.length > 0 && (
            <>
              <Button
                size="small"
                onClick={() => setShowReplies(!showReplies)}
                endIcon={showReplies ? <ExpandLess /> : <ExpandMore />}
                sx={{
                  textTransform: 'none',
                  color: 'primary.main',
                  my: 0.5,
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                {showReplies ? "收起回覆" : `查看 ${replies.length} 則回覆`}
              </Button>
              <Collapse in={showReplies}>
                <Box sx={{ mt: 1 }}>
                  {replies.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      replies={[]}
                      onReply={onReply}
                      onSubmit={onSubmit}
                      onDelete={onDelete}
                      onRefresh={onRefresh}
                      activeReplyId={activeReplyId}
                      cancelReply={cancelReply}
                      showRepliesInitially={false}
                    />
                  ))}
                </Box>
              </Collapse>
            </>
          )}
        </Box>
      </Box>

      <ReportDialog
        open={reportDialogOpen}
        onClose={handleCloseReport}
      />
    </Paper>
  );
};

const CommentSection = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<commentType[]>([]);
  const [commentText, setCommentText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
  
  // 無限滾動相關狀態
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalComments, setTotalComments] = useState(0);

  const fetchComments = async (pageNum: number = 1, isLoadMore: boolean = false) => {
    setIsLoading(true);
    try {
      // 假設你的 API 支援分頁參數
      const res = await CommentAPI.get(postId, pageNum);
      
      if (isLoadMore) {
        setComments(prev => [...prev, ...res.data]);
      } else {
        setComments(res.data);
      }
      
      setTotalComments(res.total || res.data.length);
      
      // 檢查是否還有更多留言
      if (res.data.length < 10 || (res.total && comments.length + res.data.length >= res.total)) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('載入留言失敗:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreComments = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchComments(nextPage, true);
  }, [page, isLoading, hasMore, postId]);

  const { setupObserver } = useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore: loadMoreComments,
  });

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const showToast = (msg: string) => setToast({ open: true, message: msg });

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    await CommentAPI.create({ post: postId, content: commentText });
    setCommentText("");
    showToast("留言成功");
    
    // 重新載入第一頁留言
    setPage(1);
    setHasMore(true);
    await fetchComments(1, false);
  };

  const handleReplySubmit = async (parentId: number, content: string) => {
    await CommentAPI.create({ post: postId, parent: parentId, content });
    setActiveReplyId(null);
    showToast("回覆成功");
    
    // 重新載入第一頁留言
    setPage(1);
    setHasMore(true);
    await fetchComments(1, false);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("確定要刪除嗎？")) return;
    await CommentAPI.delete(commentId);
    showToast("留言已刪除");
    
    // 重新載入第一頁留言
    setPage(1);
    setHasMore(true);
    await fetchComments(1, false);
  };

  const roots = comments.filter(c => c.parentId === null);
  const repliesByRoot = new Map<number, commentType[]>();
  comments.forEach(c => {
    if (c.parentId && c.root) {
      if (!repliesByRoot.has(c.root)) repliesByRoot.set(c.root, []);
      repliesByRoot.get(c.root)!.push(c);
    }
  });

  return (
    <Box sx={{ py: 2 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: 'text.primary'
        }}
      >
        留言 ({totalComments})
      </Typography>

      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          gap: 2,
          mb: 4,
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="寫下你的留言..."
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 2 }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              variant="contained"
              onClick={handleSubmitComment}
              disabled={!commentText.trim()}
              sx={{
                textTransform: 'none',
                borderRadius: 1.5,
                px: 3
              }}
            >
              送出
            </Button>
          </Box>
        </Box>
      </Paper>

      <Divider sx={{ mb: 3 }} />

      {roots.length > 0 ? (
        <>
          {roots.map((comment, index) => {
            const isLastItem = index === roots.length - 1;
            
            return (
              <Box
                key={comment.id}
                ref={isLastItem ? setupObserver : null}
              >
                <CommentItem
                  comment={comment}
                  replies={repliesByRoot.get(comment.id) || []}
                  onReply={(id) => setActiveReplyId(id)}
                  onSubmit={handleReplySubmit}
                  onDelete={handleDeleteComment}
                  onRefresh={() => {
                    setPage(1);
                    setHasMore(true);
                    fetchComments(1, false);
                  }}
                  activeReplyId={activeReplyId}
                  cancelReply={() => setActiveReplyId(null)}
                  showRepliesInitially={false}
                />
              </Box>
            );
          })}
          
          {/* 載入指示器 */}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          {/* 沒有更多留言提示 */}
          {!hasMore && !isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
              <Typography variant="body2" color="text.secondary">
                已載入所有留言
              </Typography>
            </Box>
          )}
        </>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ py: 4 }}
        >
          還沒有留言，快來留下第一則留言吧！
        </Typography>
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ open: false, message: "" })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{
            width: '100%',
            borderRadius: 2
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CommentSection;