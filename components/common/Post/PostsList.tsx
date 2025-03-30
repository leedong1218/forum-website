import React from 'react';
import Box from "@mui/material/Box";
import PostListItem from './PostListItem';
import { PostType } from "@/lib/types/postListType";

interface PostsListProps {
  posts: PostType[];
  getCategoryColor: (category: string) => { bg: string; text: string };
}

const PostsList: React.FC<PostsListProps> = ({ posts, getCategoryColor }) => {
  return (
    <Box sx={{ mb: 3 }}>
      {posts.map((post) => (
        <PostListItem 
          key={post.id} 
          post={post} 
          getCategoryColor={getCategoryColor} 
        />
      ))}
    </Box>
  );
};

export default PostsList;