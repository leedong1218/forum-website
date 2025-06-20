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
import { colors } from '@/styles/theme';
import { useRouter } from 'next/router';
import notificationAPI from '@/services/Notifications/NotificationsAPI';
import { CheckCircle, Edit, Error, Forum, Info, Warning } from '@mui/icons-material';

interface NotificationItem {
  id: number;
  type: string;
  message: string;
  created_at: string;
  link?: string;
  icon?: string;
  color?: string;
}

interface NotificationPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  notifications?: NotificationItem[];
}

const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  anchorEl,
  open,
  onClose,
  notifications = [],
}) => {
  const router = useRouter();

  const handleClick = async (noti: NotificationItem) => {
    try {
      await notificationAPI.markAsRead(noti.id);
    } catch (err) {
      console.warn('Mark as read failed', err);
    }

    if (noti.link) {
      router.push(noti.link);
    }

    onClose();
  };

  const getIconComponent = (iconName: string, color?: string) => {
    const iconMap: { [key: string]: React.ElementType } = {
      'info': Info,
      'warning': Warning,
      'success': CheckCircle,
      'error': Error,
      'forum': Forum,
      'edit': Edit,
    };

    const Icon = iconMap[iconName];

    if (Icon) {
      return (
        <Icon sx={{ fontSize: 20 }} />
      );
    } else {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconName}
          alt="icon"
          style={{
            width: 50,
            height: 50,
            objectFit: 'contain',
            borderRadius: '50%',
            backgroundColor: color || '#ccc',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/fallback-icon.png';
          }}
        />
      );
    }
  };

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
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderRadius: 2,
          width: 320,
          maxHeight: 400,
          border: 'solid 1px #ccc',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          通知
        </Typography>
        <List sx={{ p: 0 }}>
          {notifications.length === 0 ? (
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography variant="body2" color="text.secondary">
                已讀取完所有通知
              </Typography>
            </Box>
          ) : (
            notifications.map((noti) => (
              <ListItem
                key={noti.id}
                sx={{
                  px: 0,
                  cursor: noti.link ? 'pointer' : 'default',
                  '&:hover': {
                    backgroundColor: noti.link ? '#f5f5f5' : 'transparent',
                  },
                }}
                onClick={() => handleClick(noti)}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: noti.color || colors.accent, width: 32, height: 32
                    }}
                  >
                    {getIconComponent(noti.icon ?? '', noti.color)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={noti.message}
                  secondary={new Date(noti.created_at).toLocaleString()}
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                  secondaryTypographyProps={{ fontSize: '0.8rem' }}
                />
              </ListItem>
            ))
          )}
        </List>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="text"
            size="small"
            sx={{ color: colors.accent }}
            onClick={() => {
              router.push('/notify');
              onClose();
            }}
          >
            查看全部通知
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default NotificationPopover;
