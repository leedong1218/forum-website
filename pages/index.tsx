import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Divider } from "@mui/material";

// Sample forum posts data
const posts = [
  {
    id: 1,
    title: "系統維護",
    description: "本系統將於2025/1/1 18:00~2025/1/1 20:00 進行系統維護",
    views: 1287,
    timestamp: "2 hours ago",
  },
  {
    id: 1,
    title: "系統維護",
    description: "本系統將於2025/1/1 18:00~2025/1/1 20:00 進行系統維護",
    views: 1287,
    timestamp: "2 hours ago",
  },
  {
    id: 1,
    title: "系統維護",
    description: "本系統將於2025/1/1 18:00~2025/1/1 20:00 進行系統維護",
    views: 1287,
    timestamp: "2 hours ago",
  },
  {
    id: 1,
    title: "系統維護",
    description: "本系統將於2025/1/1 18:00~2025/1/1 20:00 進行系統維護",
    views: 1287,
    timestamp: "2 hours ago",
  },
  {
    id: 1,
    title: "系統維護",
    description: "本系統將於2025/1/1 18:00~2025/1/1 20:00 進行系統維護",
    views: 1287,
    timestamp: "2 hours ago",
  },
];

export default function Home() {
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
          系統公告
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {posts.map((post, index) => (
            <Card
              key={index}
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
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 500, mb: 1 }}
                    >
                      {post.title}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {post.timestamp}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
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
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        {post.views} views
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Layout>
  );
}
