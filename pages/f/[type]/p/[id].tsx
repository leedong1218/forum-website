import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useLoading } from "@/lib/context/LoadingContext";
import InteractionBar from "@/components/common/InteractionItem";
import CommentSection from "@/components/common/CommentItem";
import { 
  Box, Typography, Chip, Avatar, Card, 
  Paper, useTheme, Divider
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { samplePostData } from "@/lib/data/postData";
import { PostData } from "@/lib/types/postType";

export default function Post() {
  const theme = useTheme();
  const { setLoading } = useLoading();
  const [postData, setPostData] = useState<PostData>();

  useEffect(() => {
    setLoading(true);
    setPostData(samplePostData);
    setLoading(false);
  }, [setLoading]);

  const { id, category, date, avatar, author, title, content, likes, comments } = 
    postData || samplePostData;

  return (
    <Layout>
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", p: 3, mb: 4 }}>
        {/* Header section */}
        <Box sx={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Chip
              size="small"
              label={category}
              sx={{ bgcolor: theme.palette.primary.dark, color: "#fff", fontWeight: 600, borderRadius: 1, px: 1, height: 28 }}
            />
            <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary", fontSize: "0.75rem" }}>
              <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
              {date}
            </Box>
          </Box>

          {/* Author info */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={avatar?.src}
              alt={title}
              sx={{ width: 45, height: 45, boxShadow: "0 4px 14px rgba(0,0,0,0.1)", mb: 1, mr: 2 }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{author}</Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, my: 2, color: "#1e293b", fontSize: { xs: "1.75rem", md: "2rem" } }}
          >
            {title}
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ my: 3 }}>
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: 2, bgcolor: "#f8fafc", border: "1px dashed rgba(0,0,0,0.1)" }}
          >
            <div dangerouslySetInnerHTML={{ __html: content }} style={{ color: "#475569", lineHeight: 1.8 }} />
          </Paper>
        </Box>
        
        {/* Interaction Bar */}
        <Divider sx={{ my: 2 }} />
        <InteractionBar initialLikes={likes} initialComments={comments} />
        
        {/* Comment Section */}
        <CommentSection postId={id} />
      </Card>
    </Layout>
  );
}