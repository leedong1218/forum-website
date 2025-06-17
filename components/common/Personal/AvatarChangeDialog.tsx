import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Camera, Upload, X } from '@mui/icons-material';
import UserAPI from '@/services/User/UserAPI';

type AvatarChangeDialogProps = {
  open: boolean;
  onClose: () => void;
  currentAvatar?: string;
  onAvatarChange: (previewImage: string, file: File) => void;
  accentColor?: string;
  accentColorDark?: string;
};

export const AvatarChangeDialog: React.FC<AvatarChangeDialogProps> = ({
  open,
  onClose,
  currentAvatar,
  onAvatarChange,
  accentColor = '#1976d2',
  accentColorDark = '#115293'
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    if (file) {
      // 檢查檔案類型
      if (!file.type.startsWith('image/')) {
        alert('請選擇圖片檔案');
        return;
      }

      // 檢查檔案大小 (限制 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('檔案大小不能超過 5MB');
        return;
      }

      setSelectedFile(file);

      // 創建預覽圖片
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setPreviewImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    if (!selectedFile || !previewImage) {
      return;
    }

    setIsUploading(true);

    try {
      // 準備上傳資料，根據你的 API 格式
      const uploadData = {
        avatar: [selectedFile] // 根據你的 API，avatar 是一個檔案陣列
      };

      await UserAPI.avatar(uploadData);
      onAvatarChange(previewImage, selectedFile);

      handleClose();
    } catch {
      alert('上傳失敗，請重試');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2
        }}>
          <Typography fontWeight="600">
            更換大頭貼
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: 'grey.500' }}
            disabled={isUploading}
          >
            <X sx={{ fontSize: '20px' }} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}>
            {/* 大頭貼預覽區域 */}
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={previewImage || currentAvatar}
                sx={{
                  width: 120,
                  height: 120,
                  border: '3px solid',
                  borderColor: previewImage ? accentColor : 'grey.300',
                  transition: 'all 0.3s ease'
                }}
              >
                {!previewImage && !currentAvatar && (
                  <Camera sx={{ color: "#999" }} />
                )}
              </Avatar>

              {/* 上傳中的載入指示器 */}
              {isUploading && (
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '50%'
                }}>
                  <CircularProgress size={30} sx={{ color: accentColor }} />
                </Box>
              )}
            </Box>

            {/* 上傳按鈕 */}
            <Button
              variant="outlined"
              startIcon={<Upload sx={{ fontSize: '18px' }} />}
              onClick={triggerFileInput}
              disabled={isUploading}
              sx={{
                borderColor: accentColor,
                color: accentColor,
                '&:hover': {
                  borderColor: accentColorDark,
                  backgroundColor: `${accentColor}10`
                },
                '&:disabled': {
                  borderColor: 'grey.300',
                  color: 'grey.400'
                },
                borderRadius: 2,
                px: 3,
                py: 1
              }}
            >
              選擇圖片
            </Button>

            {/* 檔案資訊 */}
            {selectedFile && (
              <Box sx={{
                textAlign: 'center',
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
                width: '100%'
              }}>
                <Typography variant="body2" color="text.secondary">
                  檔案名稱: {selectedFile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  檔案大小: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              </Box>
            )}

            {/* 提示文字 */}
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ maxWidth: 300 }}
            >
              支援 JPG、PNG、GIF 格式，檔案大小限制 5MB
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={isUploading}
            sx={{
              borderRadius: 2,
              minWidth: 80
            }}
          >
            取消
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={!selectedFile || isUploading}
            sx={{
              bgcolor: accentColor,
              '&:hover': { bgcolor: accentColorDark },
              '&:disabled': {
                bgcolor: 'grey.300',
                color: 'grey.500'
              },
              borderRadius: 2,
              minWidth: 80
            }}
          >
            {isUploading ? (
              <>
                <CircularProgress size={16} sx={{ color: 'white', mr: 1 }} />
                上傳中...
              </>
            ) : (
              '確認更換'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 隱藏的檔案輸入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </>
  );
};