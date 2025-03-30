import React from 'react';
import Grid from "@mui/material/Grid";
import PostCard from './PostCard';
import { PostType } from "@/lib/types/postListType";

interface PostsGridProps {
  posts: PostType[];
  getCategoryColor: (category: string) => { bg: string; text: string };
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts, getCategoryColor }) => {
  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <PostCard post={post} getCategoryColor={getCategoryColor} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsGrid;