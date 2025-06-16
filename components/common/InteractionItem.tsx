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

// Type definitions
interface InteractionItemProps {
  icon: ReactNode; // Icon to display when not active
  activeIcon: ReactNode; // Icon to display when active
  count?: number; // Count to display
  label: string; // Tooltip text
  active: boolean; // Whether the interaction is active
  onClick: () => void; // Click handler
  color: string; // Color when active
}

interface InteractionBarProps {
  initialLikes?: number; // Initial like count
  initialComments?: number; // Initial comment count
  postId: number;
  isLikedA: boolean; // Whether the post is liked
  isBookmarkedA: boolean; // Whether the post is bookmarked
}

// Utility function to format numbers (e.g., 1000 → 1K)
const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

// Interaction item component (for like or comment)
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
            display: "flex",
            alignItems: "center",
            fontSize: "0.75rem",
            color: active ? color : "text.secondary",
            transition: "all 0.2s",
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
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 600, ml: 0.5 }}
        >
          {formatNumber(count)}
        </Typography>
      )}
    </Box>
  );
};

const InteractionBar = ({
  initialLikes = 0,
  initialComments = 0,
  postId,
  isLikedA,
  isBookmarkedA
}: InteractionBarProps) => {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState<boolean>(isLikedA);
  const [isSaved, setIsSaved] = useState<boolean>(isBookmarkedA);
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

    await PostAPI.bookMark(postId);
  };

  const handleOpenReport = () => {
    setReportDialogOpen(true);
  }

  const handleCloseReport = () => {
    setReportDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pt: 1,
      }}
    >
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
          onClick={() => { }}
          color={theme.palette.primary.main}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <InteractionItem
          icon={<TurnedInNot />}
          activeIcon={<Bookmark />}
          label="收藏"
          active={isSaved}
          onClick={handleSaveClick}
          color={theme.palette.primary.main}
        />
        <Tooltip title={"檢舉"}>
          <IconButton
            onClick={handleOpenReport}
            sx={{ p: 0.5, ml: -0.5 }}
          >
            <Warning color="warning" />
          </IconButton>
        </Tooltip>
      </Box>
      <ReportDialog
        open={reportDialogOpen}
        onClose={handleCloseReport}
      />
    </Box>
  );
};

export default InteractionBar;
