import React from 'react';
import {
  Popover,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import ForumIcon from '@mui/icons-material/Forum';
import { colors } from '@/styles/theme';
import { useRouter } from 'next/router';

interface NotificationItem {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  avatar: {
    type: 'icon' | 'text';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
    bgcolor: string;
  };
}

interface NotificationPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  notifications?: NotificationItem[];
}

const defaultNotifications: NotificationItem[] = [
  {
    id: 1,
    type: 'reply',
    title: '新的回覆',
    message: '有人回覆了你的貼文',
    time: '2分鐘前',
    avatar: { type: 'icon', content: ForumIcon, bgcolor: colors.accent }
  },
  {
    id: 2,
    type: 'follow',
    title: '新的追蹤者',
    message: 'John 開始追蹤你',
    time: '1小時前',
    avatar: { type: 'text', content: 'J', bgcolor: colors.gradient }
  },
  {
    id: 3,
    type: 'like',
    title: '貼文被讚',
    message: '你的貼文獲得了10個讚',
    time: '3小時前',
    avatar: { type: 'icon', content: Edit, bgcolor: '#ff9800' }
  }
];

const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  anchorEl,
  open,
  onClose,
  notifications = defaultNotifications
}) => {
  const router = useRouter();

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          mt: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderRadius: 2,
          width: 320,
          maxHeight: 400,
          border: 'solid 1px #ccc'
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          通知
        </Typography>
        <List sx={{ p: 0 }}>
          {notifications.map((notification) => (
            <ListItem key={notification.id} sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: notification.avatar.bgcolor, width: 32, height: 32 }}>
                  {notification.avatar.type === 'icon' ? (
                    <notification.avatar.content sx={{ fontSize: 18 }} />
                  ) : (
                    notification.avatar.content
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={notification.title}
                secondary={`${notification.message} - ${notification.time}`}
                primaryTypographyProps={{ fontSize: '0.9rem' }}
                secondaryTypographyProps={{ fontSize: '0.8rem' }}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button 
            variant="text" 
            size="small" 
            sx={{ color: colors.accent }}
            onClick={() => router.push('/notify')}
          >
            查看全部通知
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default NotificationPopover;