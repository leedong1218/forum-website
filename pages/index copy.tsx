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
    description: "Discussing the latest advancements in quantum computing and their implications for cybersecurity.",
    author: "TechExplorer",
    avatar: "T",
    category: "Technology",
    comments: 42,
    views: 1287,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    title: "AI Model Architecture Design",
    description: "Share your experiences with different AI model architectures and optimization techniques.",
    author: "DataScientist",
    avatar: "D",
    category: "AI & ML",
    comments: 28,
    views: 956,
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    title: "Future of Web Development",
    description: "Exploring emerging technologies that will shape the future of web applications.",
    author: "CodeCrafter",
    avatar: "C",
    category: "Development",
    comments: 36,
    views: 1105,
    timestamp: "8 hours ago"
  },
  {
    id: 4,
    title: "Blockchain Implementation Challenges",
    description: "Discussion thread for solving common blockchain implementation issues in enterprise applications.",
    author: "BlockchainDev",
    avatar: "B",
    category: "Blockchain",
    comments: 19,
    views: 672,
    timestamp: "1 day ago"
  }
];

// Featured boards
const featuredBoards = [
  { name: "AI & Machine Learning", members: 4528 },
  { name: "Web3 & Blockchain", members: 3641 },
  { name: "Cybersecurity", members: 5129 },
  { name: "Frontend Development", members: 6245 }
];

export default function Home() {
  const [selectedPost, setSelectedPost] = useState(0);

  return (
    <Layout>
      {/* Hero section */}
      <Box sx={{ 
        width: "100%", 
        mb: 4, 
        p: 4, 
        borderRadius: 2,
        background: "linear-gradient(90deg, rgba(25,118,210,0.05) 0%, rgba(66,66,66,0.1) 100%)",
        border: "1px solid rgba(25,118,210,0.2)"
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1, color: "#263238" }}>
          TechForum
        </Typography>
        <Typography variant="body1" sx={{ color: "#546e7a", maxWidth: "700px" }}>
          Connect with developers, designers, and tech enthusiasts. Discover cutting-edge discussions across AI, blockchain, cybersecurity, and more.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Main content - posts */}
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 500, mb: 2, color: "#263238" }}>
              Trending Discussions
            </Typography>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {posts.map((post, index) => (
                <Card 
                  key={index}
                  sx={{ 
                    borderRadius: 2,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 3
                    },
                    border: selectedPost === index ? "1px solid #1976d2" : "1px solid transparent",
                    backgroundColor: selectedPost === index ? "rgba(25,118,210,0.04)" : "white"
                  }}
                >
                  <CardActionArea
                    onClick={() => setSelectedPost(index)}
                    sx={{ p: 1 }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Chip 
                          size="small" 
                          label={post.category}
                          sx={{ 
                            backgroundColor: "rgba(25,118,210,0.1)", 
                            color: "#1976d2",
                            fontWeight: 500,
                            borderRadius: 1
                          }} 
                        />
                        <Typography variant="caption" color="text.secondary">
                          {post.timestamp}
                        </Typography>
                      </Box>
                      
                      <Typography variant="h6" component="div" sx={{ fontWeight: 500, mb: 1 }}>
                        {post.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {post.description}
                      </Typography>
                      
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar 
                            sx={{ 
                              width: 28, 
                              height: 28, 
                              bgcolor: "primary.main",
                              fontSize: "0.8rem",
                              mr: 1
                            }}
                          >
                            {post.avatar}
                          </Avatar>
                          <Typography variant="body2" color="text.primary">
                            {post.author}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                            {post.comments} comments
                          </Typography>
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
        </Grid>
        
        {/* Side content - featured boards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, mb: 3, overflow: "visible" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                Featured Boards
              </Typography>
              
              {featuredBoards.map((board, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    py: 1.5,
                    borderBottom: index < featuredBoards.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" 
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {board.name}
                  </Typography>
                  <Chip 
                    size="small" 
                    label={`${board.members.toLocaleString()} members`} 
                    sx={{ 
                      backgroundColor: "rgba(0,0,0,0.04)",
                      borderRadius: 1
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
          
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                Activity Stats
              </Typography>
              
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: "#546e7a", display: "flex", justifyContent: "space-between" }}>
                  <span>Active users</span>
                  <span style={{ fontWeight: 500 }}>2,845</span>
                </Typography>
              </Box>
              
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: "#546e7a", display: "flex", justifyContent: "space-between" }}>
                  <span>Posts today</span>
                  <span style={{ fontWeight: 500 }}>342</span>
                </Typography>
              </Box>
              
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: "#546e7a", display: "flex", justifyContent: "space-between" }}>
                  <span>New members</span>
                  <span style={{ fontWeight: 500 }}>87</span>
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ color: "#546e7a", display: "flex", justifyContent: "space-between" }}>
                  <span>Total discussions</span>
                  <span style={{ fontWeight: 500 }}>24,561</span>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}