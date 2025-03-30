import { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  Reply,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import Sticker from "@/public/images/sticker.jpg";
import Image from "next/image";

// Types
export interface ReplyType {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export interface CommentType {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: ReplyType[];
}

interface CommentItemProps {
  comment: CommentType;
  onLike: (id: number) => void;
  onReply: (id: number) => void;
  activeReplyId: number | null;
  onReplySubmit: (commentId: number, content: string) => void;
  onCancelReply: () => void;
}

// Comment item component
const CommentItem = ({
  comment,
  onLike,
  onReply,
  activeReplyId,
  onReplySubmit,
  onCancelReply,
}: CommentItemProps) => {
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReplySubmit(comment.id, replyText);
      setReplyText("");
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Use Image for avatar */}
        <Box 
          sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            overflow: 'hidden', 
            flexShrink: 0,
            position: 'relative'
          }}
        >
          <Image 
            src={comment.avatar || Sticker} 
            alt={comment.author}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              {comment.author}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {comment.timestamp}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
            {comment.content}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => onLike(comment.id)}
              sx={{ color: comment.isLiked ? "error.main" : "text.secondary" }}
            >
              {comment.isLiked ? (
                <Favorite fontSize="small" />
              ) : (
                <FavoriteBorder fontSize="small" />
              )}
            </IconButton>
            <Typography variant="caption">{comment.likes}</Typography>
            <IconButton
              size="small"
              onClick={() => onReply(comment.id)}
              sx={{ color: "text.secondary" }}
            >
              <Reply fontSize="small" />
            </IconButton>
            {comment.replies && comment.replies.length > 0 && (
              <Button
                size="small"
                sx={{ ml: 1 }}
                onClick={() => setShowReplies(!showReplies)}
                endIcon={showReplies ? <ExpandLess /> : <ExpandMore />}
              >
                {showReplies
                  ? "收起回覆"
                  : `${comment.replies.length} 則回覆`}
              </Button>
            )}
          </Box>

          {/* Reply form */}
          {activeReplyId === comment.id && (
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="回覆..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                variant="outlined"
              />
              <Button
                variant="contained"
                size="small"
                onClick={handleReplySubmit}
                disabled={!replyText.trim()}
              >
                送出
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={onCancelReply}
              >
                取消
              </Button>
            </Box>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <Collapse in={showReplies}>
              <Box sx={{ mt: 2 }}>
                {comment.replies.map((reply) => (
                  <Box key={reply.id} sx={{ display: "flex", gap: 2, mt: 2 }}>
                    {/* Use Image for reply avatar */}
                    <Box 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        borderRadius: '50%', 
                        overflow: 'hidden',
                        flexShrink: 0,
                        position: 'relative'
                      }}
                    >
                      <Image 
                        src={reply.avatar || Sticker} 
                        alt={reply.author}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600} fontSize="0.875rem">
                          {reply.author}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {reply.timestamp}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {reply.content}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                        <IconButton
                          size="small"
                          sx={{
                            p: 0.5,
                            color: reply.isLiked ? "error.main" : "text.secondary",
                          }}
                        >
                          {reply.isLiked ? (
                            <Favorite fontSize="small" />
                          ) : (
                            <FavoriteBorder fontSize="small" />
                          )}
                        </IconButton>
                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                          {reply.likes}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Collapse>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Comment section component
interface CommentSectionProps {
  postId: number;
}

// Sample data
const sampleComments: CommentType[] = [
  {
    id: 1,
    author: "張小明",
    content: "哈哈哈笑死我了，尤其是第5個笑話太有梗了！",
    timestamp: "3小時前",
    likes: 24,
    isLiked: false,
    replies: [
      {
        id: 101,
        author: "李大華",
        content: "我最喜歡第9個法老王那個，太有創意了！",
        timestamp: "2小時前",
        likes: 7,
        isLiked: false,
      },
      {
        id: 102,
        author: "王小美",
        content: "同意！暖暖包那個也很妙",
        timestamp: "1小時前",
        likes: 3,
        isLiked: true,
      },
    ],
  },
  {
    id: 2,
    author: "陳大中",
    content: "這種笑話我阿公都知道了，不過還是笑出來了😂",
    timestamp: "昨天",
    likes: 18,
    isLiked: true,
    replies: [],
  },
  {
    id: 3,
    author: "林小華",
    content: "冰塊退伍那個很有梗！我要分享給我朋友看",
    timestamp: "2天前",
    likes: 11,
    isLiked: false,
    replies: [],
  },
];

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentType[]>(sampleComments);
  const [commentText, setCommentText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

  // Handle comment like
  const handleCommentLike = (commentId: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      })
    );
  };

  // Handle reply to comment
  const handleReply = (commentId: number) => {
    setActiveReplyId(commentId === activeReplyId ? null : commentId);
  };

  // Handle reply submission
  const handleReplySubmit = (commentId: number, content: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          const newReply: ReplyType = {
            id: Date.now(),
            author: "訪客用戶",
            content,
            timestamp: "剛剛",
            likes: 0,
            isLiked: false,
          };
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      })
    );
    setActiveReplyId(null);
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment: CommentType = {
        id: Date.now(),
        author: "訪客用戶",
        content: commentText,
        timestamp: "剛剛",
        likes: 0,
        isLiked: false,
        replies: [],
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        留言 ({comments.length})
      </Typography>

      {/* Comment form */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        {/* Use Image for guest avatar */}
        <Box 
          sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            overflow: 'hidden',
            flexShrink: 0,
            position: 'relative'
          }}
        >
          <Image 
            src={Sticker} 
            alt="Guest"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            placeholder="留下您的留言..."
            multiline
            rows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            variant="outlined"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button
              variant="contained"
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
            >
              送出留言
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Comments list */}
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onLike={handleCommentLike}
          onReply={handleReply}
          activeReplyId={activeReplyId}
          onReplySubmit={handleReplySubmit}
          onCancelReply={() => setActiveReplyId(null)}
        />
      ))}
    </Box>
  );
};

export default CommentSection;