import { useState, ReactNode } from "react";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
  TurnedInNot,
  Bookmark,
  Warning,
} from "@mui/icons-material";
import { ReportDialog } from "./ReportPopup";
import PostAPI from "@/services/Post/PostAPI";

interface InteractionItemProps {
  icon: ReactNode;
  activeIcon: ReactNode;
  count?: number;
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
}

interface InteractionBarProps {
  initialLikes?: number;
  initialComments?: number;
  initialBookmarked?: number;
  postId: number;
  isLikedA: boolean;
  isBookmarkedA: boolean;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

const InteractionItem = ({
  icon,
  activeIcon,
  count,
  label,
  active,
  onClick,
  color,
}: InteractionItemProps) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
      <Tooltip title={label}>
        <IconButton
          onClick={onClick}
          sx={{
            color: active ? color : "text.secondary",
            "&:hover": {
              transform: "scale(1.1)",
              color: active ? color : theme.palette.grey[600],
            },
          }}
        >
          {active ? activeIcon : icon}
        </IconButton>
      </Tooltip>
      {count !== undefined && (
        <Typography variant="body2" sx={{ fontWeight: 600, ml: 0.5 }}>
          {formatNumber(count)}
        </Typography>
      )}
    </Box>
  );
};

const InteractionBar = ({
  initialLikes = 0,
  initialComments = 0,
  initialBookmarked = 0,
  postId,
  isLikedA,
  isBookmarkedA,
}: InteractionBarProps) => {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState<boolean>(isLikedA);
  const [isSaved, setIsSaved] = useState<boolean>(isBookmarkedA);
  const [savedCount, setSavedCount] = useState<number>(initialBookmarked);
  const [likeCount, setLikeCount] = useState<number>(initialLikes);
  const [commentCount] = useState<number>(initialComments);
  const [reportDialogOpen, setReportDialogOpen] = useState<boolean>(false);

  const handleLikeClick = async () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    await PostAPI.like(postId);
  };

  const handleSaveClick = async () => {
    setIsSaved(!isSaved);
    setSavedCount((prev) => (isSaved ? prev - 1 : prev + 1));

    await PostAPI.bookMark(postId);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <InteractionItem
          icon={<FavoriteBorder />}
          activeIcon={<Favorite />}
          count={likeCount}
          label={isLiked ? "取消讚" : "讚"}
          active={isLiked}
          onClick={handleLikeClick}
          color={theme.palette.error.main}
        />
        <InteractionItem
          icon={<ChatBubbleOutline />}
          activeIcon={<ChatBubbleOutline />}
          count={commentCount}
          label="留言"
          active={false}
          onClick={() => {}}
          color={theme.palette.primary.main}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <InteractionItem
          icon={<TurnedInNot />}
          activeIcon={<Bookmark />}
          count={savedCount}
          label="收藏"
          active={isSaved}
          onClick={handleSaveClick}
          color={theme.palette.primary.main}
        />
        <Tooltip title={"檢舉"}>
          <IconButton onClick={() => setReportDialogOpen(true)}>
            <Warning color="warning" />
          </IconButton>
        </Tooltip>
      </Box>
      <ReportDialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        targetId={postId}
        targetType="post"
      />
    </Box>
  );
};

export default InteractionBar;
