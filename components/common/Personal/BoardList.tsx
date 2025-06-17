import React, { useState } from 'react';
import {
  List,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Avatar,
  Button
} from '@mui/material';
import {
  People,
  Article,
  Bookmark,
  BookmarkBorder
} from '@mui/icons-material';
import Link from 'next/link';
import BoardsAPI from '@/services/Boards/BoardsAPI';

export type BoardTypes = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  memberCount?: number;
  postCount?: number;
  isFollowing?: boolean;
  avatar?: string;
  link?: string;
}

interface BoardListProps {
  follows: BoardTypes[];
}

export default function BoardList({ follows }: BoardListProps) {
  // 使用本地狀態來追蹤每個看板的追蹤狀態
  const [localFollowStates, setLocalFollowStates] = useState<Record<string, boolean>>({});
  
  // 如果沒有追蹤的看板，顯示提示訊息
  if (!follows || follows.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 8,
        color: 'text.secondary'
      }}>
        <Typography variant="h6" gutterBottom>
          尚未追蹤任何看板
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          開始探索並追蹤感興趣的看板吧！
        </Typography>
        <Button
          component={Link}
          href="/forum/all"
          variant="contained"
          sx={{ borderRadius: 2 }}
        >
          探索看板
        </Button>
      </Box>
    );
  }

  const handleToggleFollow = async (boardId: string, currentStatus: boolean) => {
    // 立即更新本地狀態（樂觀更新）
    setLocalFollowStates(prev => ({
      ...prev,
      [boardId]: !currentStatus
    }));

    try {
      // 調用 API
      await BoardsAPI.follow(boardId);
      // API 成功，本地狀態已經是正確的
    } catch (error) {
      // API 失敗，回滾本地狀態
      console.error('追蹤操作失敗:', error);
      setLocalFollowStates(prev => ({
        ...prev,
        [boardId]: currentStatus
      }));
      // 可以在這裡顯示錯誤提示
    }
  };

  // 獲取實際的追蹤狀態（優先使用本地狀態）
  const getFollowStatus = (boardId: string, originalStatus: boolean) => {
    return localFollowStates.hasOwnProperty(boardId) 
      ? localFollowStates[boardId] 
      : originalStatus;
  };

  return (
    <List sx={{ width: "100%", p: 0 }}>
      {follows.map((board, index) => {
        const currentFollowStatus = getFollowStatus(board.id, board.isFollowing || false);
        
        return (
          <Card
            key={board.id || index}
            sx={{
              mb: 2,
              borderRadius: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              },
              border: "1px solid #f0f0f0",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ py: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                  {/* 看板頭像 */}
                  <Avatar
                    src={board.avatar}
                    sx={{
                      width: 48,
                      height: 48,
                      mr: 2,
                      bgcolor: '#e3f2fd'
                    }}
                  >
                    {board.name.charAt(0)}
                  </Avatar>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {/* 看板名稱 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography
                        component={Link}
                        href={board.link || `/board/${board.id}`}
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: "#1e293b",
                          textDecoration: "none",
                          "&:hover": {
                            color: "#1976d2"
                          }
                        }}
                      >
                        {board.name}
                      </Typography>
                      
                      {board.category && (
                        <Chip
                          size="small"
                          label={board.category}
                          sx={{
                            ml: 1,
                            height: 20,
                            fontSize: "0.7rem",
                            bgcolor: '#f5f5f5'
                          }}
                        />
                      )}
                    </Box>

                    {/* 看板描述 */}
                    {board.description && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#64748b",
                          mb: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {board.description}
                      </Typography>
                    )}

                    {/* 統計資訊 */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {typeof board.memberCount === 'number' && (
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          fontSize: "0.75rem"
                        }}>
                          <People sx={{ fontSize: 14, mr: 0.5 }} />
                          {board.memberCount.toLocaleString()} 成員
                        </Box>
                      )}

                      {typeof board.postCount === 'number' && (
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          fontSize: "0.75rem"
                        }}>
                          <Article sx={{ fontSize: 14, mr: 0.5 }} />
                          {board.postCount.toLocaleString()} 文章
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>

                {/* 追蹤按鈕 */}
                <Button
                  variant={currentFollowStatus ? "outlined" : "contained"}
                  size="small"
                  startIcon={currentFollowStatus ? <Bookmark /> : <BookmarkBorder />}
                  onClick={() => handleToggleFollow(board.id, currentFollowStatus)}
                  sx={{
                    borderRadius: 2,
                    minWidth: 90,
                    ml: 2
                  }}
                >
                  {currentFollowStatus ? '已追蹤' : '追蹤'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </List>
  );
}