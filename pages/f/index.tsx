import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  TurnedInNot,
} from "@mui/icons-material";

// Sample forum posts data
const posts = [
  {
    id: 1,
    title: "Quantum Computing Breakthroughs",
    description:
      "Discussing the latest advancements in quantum computing and their implications for cybersecurity.Discussing the latest advancements in quantum computing and their implications for cybersecurity.",
    author: "TechExplorer",
    avatar: "T",
    category: "Technology",
    comments: 42,
    views: 1287,
    timestamp: "2 hours ago",
    link: "/post"
  },
  {
    id: 2,
    title: "AI Model Architecture Design",
    description:
      "Share your experiences with different AI model architectures and optimization techniques.",
    author: "DataScientist",
    avatar: "D",
    category: "AI & ML",
    comments: 28,
    views: 956,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    title: "Future of Web Development",
    description:
      "Exploring emerging technologies that will shape the future of web applications.",
    author: "CodeCrafter",
    avatar: "C",
    category: "Development",
    comments: 36,
    views: 1105,
    timestamp: "8 hours ago",
  },
  {
    id: 4,
    title: "Blockchain Implementation Challenges",
    description:
      "Discussion thread for solving common blockchain implementation issues in enterprise applications.",
    author: "BlockchainDev",
    avatar: "B",
    category: "Blockchain",
    comments: 19,
    views: 672,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    title: "Blockchain Implementation Challenges",
    description:
      "Discussion thread for solving common blockchain implementation issues in enterprise applications.",
    author: "BlockchainDev",
    avatar: "B",
    category: "Blockchain",
    comments: 19,
    views: 672,
    timestamp: "1 day ago",
  },
];

export default function Article() {
  const [selectedPost, setSelectedPost] = useState(0);
  const [type, setType] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <Layout>
      {/* Hero section */}
      <Box
        sx={{
          width: "100%",
          mb: 4,
          p: 4,
          borderRadius: 2,
          background:
            "linear-gradient(90deg, rgba(25,118,210,0.05) 0%, rgba(66,66,66,0.1) 100%)",
          border: "1px solid rgba(25,118,210,0.2)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 600, mb: 1, color: "#263238" }}
        >
          Technology
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#546e7a", maxWidth: "700px" }}
        >
          Connect with developers, designers, and tech enthusiasts. Discover
          cutting-edge discussions across AI, blockchain, cybersecurity, and
          more.
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <FormControl sx={{ mb: 3, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">排序</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={type}
          label="排序"
          onChange={handleChange}
        >
          <MenuItem value={"熱門"}>熱門</MenuItem>
          <MenuItem value={"最新"}>最新</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {/* Main content - posts */}
        {posts.map((post, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 3,
                },
                border:
                  selectedPost === index
                    ? "1px solid #1976d2"
                    : "1px solid transparent",
                backgroundColor:
                  selectedPost === index ? "rgba(25,118,210,0.04)" : "white",
              }}
            >
              <CardActionArea
                onClick={() => setSelectedPost(index)}
                sx={{ p: 1 }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Chip
                      size="small"
                      label={post.category}
                      sx={{
                        backgroundColor: "rgba(25,118,210,0.1)",
                        color: "#1976d2",
                        fontWeight: 500,
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {post.timestamp}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: "primary.main",
                        fontSize: "0.8rem",
                        mr: 1,
                      }}
                    >
                      {post.avatar}
                    </Avatar>
                    <Typography variant="body2" color="text.primary">
                      {post.author}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 500, mb: 1 }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {post.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <FavoriteBorder sx={{ mr: 0.5 }} />
                        {post.comments}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <ChatBubbleOutline sx={{ mr: 0.5 }} />
                        {post.comments}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <TurnedInNot sx={{ mr: 0.5 }} />
                        {post.comments}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
