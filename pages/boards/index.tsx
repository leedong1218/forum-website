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

// Sample forum posts data
const posts = [
  {
    id: 1,
    title: "Quantum Computing Breakthroughs",
    description:
      "Discussing the latest advancements in quantum computing and their implications for cybersecurity.",
    avatar: "T",
    category: "Technology",
    followers: 42,
    isFollow: true,
  },
  {
    id: 2,
    title: "AI Model Architecture Design",
    description:
      "Share your experiences with different AI model architectures and optimization techniques.",
    avatar: "D",
    category: "AI & ML",
    followers: 28,
    isFollow: true,
  },
  {
    id: 3,
    title: "Future of Web Development",
    description:
      "Exploring emerging technologies that will shape the future of web applications.",
    avatar: "C",
    category: "Development",
    followers: 36,
    isFollow: false,
  },
  {
    id: 4,
    title: "Blockchain Implementation Challenges",
    description:
      "Discussion thread for solving common blockchain implementation issues in enterprise applications.",
    avatar: "B",
    category: "Blockchain",
    followers: 19,
    isFollow: true,
  },
  {
    id: 5,
    title: "Blockchain Implementation Challenges",
    description:
      "Discussion thread for solving common blockchain implementation issues in enterprise applications.",
    avatar: "B",
    category: "Blockchain",
    followers: 19,
    isFollow: false,
  },
];

export default function Board() {
  const [selectedPost, setSelectedPost] = useState(0);

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
          所有看板
        </Typography>
      </Box>

      <Grid container spacing={2} wrap="wrap">
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mb: 2,
                      }}
                    >
                      {post.avatar}
                    </Avatar>

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
                    </Box>
                  </Grid>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {post.description}
                  </Typography>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {post.isFollow ? "已追蹤" : "追蹤"}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.primary">
                    追蹤人數 {post.followers}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
