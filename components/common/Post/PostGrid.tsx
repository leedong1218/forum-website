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
    <Grid container
      sx={{
        display: 'grid',
        gridTemplateColumns: { lg: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)' },
        gap: 1
      }}>
      {posts.map((post) => (
        <Grid key={post.id}>
          <PostCard post={post} getCategoryColor={getCategoryColor} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsGrid;