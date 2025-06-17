import Layout from "@/components/layout/Layout";
import { Avatar, Badge, Box, Button, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import styles from "@/styles/pages/Personal.module.scss";
import { ArticleOutlined, CalendarMonth, Camera, Check, ContentCopy, Edit, ThumbUp } from "@mui/icons-material";
import UserAPI from "@/services/User/UserAPI";
import { useEffect, useState } from "react";
import { EditPopupTypes, UserProfile } from "@/lib/types/userProfileType";
import { StatCard } from "@/components/common/Personal/StatCard";
import EditPopup from "@/components/common/Personal/EditPopup";
import PaginationTags from "@/components/common/Personal/PaginationTags";
import { AvatarChangeDialog } from "@/components/common/Personal/AvatarChangeDialog";

// 主題色彩定義
const accentColor = "#0ea5e9"; // 主藍色
const accentColorDark = "#0284c7"; // 深藍色

export default function Personal() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>();
  const [userCopied, setUserCopied] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);

  useEffect(() => {
    UserAPI.self()
      .then(res => {
        if (res.data) {
          setUserProfile({
            ...res.data,
            id: String(res.data.id),
          });
        }
      })
      .catch(err => console.error("取得用戶資料失敗", err))
  }, []);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(`@${userProfile?.username}`);
    setUserCopied(true);
    setTimeout(() => setUserCopied(false), 2000);
  };

  const handleSave = (updatedData: EditPopupTypes) => {
    console.log("Updated profile data:", updatedData);
  };

  const handleAvatarChange = () => {
    window.location.reload();
  };

  return (
    <Layout showProfileCard={false}>
      <Box sx={{
        width: '100%', mb: 3, borderRadius: 3, background: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        p: 5,
        gap: 5,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
      }}
        className={styles.contentWrap}>
        <Box sx={{ position: 'relative', height: '140px' }}>
          <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Avatar
              sx={{
                width: 140, height: 140, border: '4px solid white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
              {userProfile?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userProfile?.avatar}
                  alt={userProfile?.displayName}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              ) : (
                userProfile?.displayName?.charAt(0)?.toUpperCase() || '?'
              )}
            </Avatar>
          </Badge>
          <Tooltip title="更換大頭照">
            <IconButton
              sx={{
                position: 'absolute', bottom: '0', right: '0',
                bgcolor: accentColor, color: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: accentColorDark },
                border: '2px solid white'
              }}
              onClick={() => setOpenAvatarDialog(true)}
            >
              <Camera sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box className={styles.wrap}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
              {userProfile?.displayName}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              sx={{
                minWidth: 0,
                p: 0,
                width: '30px',
                height: '30px',
                borderRadius: 2,
                borderColor: 'rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  borderColor: accentColor,
                  color: accentColor,
                  bgcolor: 'transparent'
                }
              }}
            >
              <Edit fontSize="small" />
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                display: 'flex', alignItems: 'center', cursor: 'pointer',
                '&:hover': { color: accentColor }
              }}
              onClick={handleCopyUsername}
            >
              @{userProfile?.username}
              <Tooltip title={userCopied ? "已複製" : "複製用戶名稱"}>
                <IconButton size="small" sx={{ ml: 0.5 }}>
                  {userCopied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Typography>
            <Tooltip title="加入日期">
              <Chip
                icon={<CalendarMonth sx={{ fontSize: 16 }} />}
                label={userProfile?.joinedDate}
                size="small"
                sx={{
                  fontSize: '0.8rem',
                  bgcolor: 'rgba(0,0,0,0.04)',
                  '& .MuiChip-icon': { color: 'text.secondary' }
                }}
                clickable
              />
            </Tooltip>
          </Box>
          <Box sx={{ mb: 1 }}>{userProfile?.info}</Box>
          <Box className={styles.digital}>
            <StatCard icon={ArticleOutlined} label={'貼文數'} count={userProfile?.postCount ?? 0} />
            <StatCard icon={ThumbUp} label={'獲得讚數'} count={userProfile?.likeCount ?? 0} />
          </Box>
        </Box>
      </Box>
      <Box>
        <PaginationTags userId={userProfile?.id || ''} />
      </Box>
      <EditPopup
        isEditingProfile={isEditingProfile}
        setIsEditingProfile={setIsEditingProfile}
        userData={userProfile}
        onSave={handleSave}
      />
      <AvatarChangeDialog
        open={openAvatarDialog}
        onClose={() => setOpenAvatarDialog(false)}
        currentAvatar={userProfile?.avatar}
        onAvatarChange={handleAvatarChange}
        accentColor={accentColor}
        accentColorDark={accentColorDark}
      />
    </Layout>
  )
}