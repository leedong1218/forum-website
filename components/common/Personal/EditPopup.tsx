import { EditPopupTypes } from "@/lib/types/userProfileType";
import UserAPI from "@/services/User/UserAPI";
import { Close } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditPopup({ isEditingProfile, setIsEditingProfile, userData, onSave }: EditPopupTypes) {
  const [formData, setFormData] = useState({
    displayName: userData?.displayName || "",
    info: userData?.info || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialData = {
      displayName: userData?.displayName || "",
      info: userData?.info || "",
    };
    setFormData(initialData);
  }, [userData]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 先調用 API 更新資料
      const response = await UserAPI.profile(formData);

      // API 成功後才更新父組件狀態
      if (response) {
        onSave(formData);
        setIsEditingProfile(false);
        toast.success('個人資料已更新成功！');
      }
    } catch (error) {
      console.error('更新個人資料失敗:', error);
      // 這裡可以加入錯誤處理，例如顯示錯誤訊息
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isEditingProfile}
      onClose={() => setIsEditingProfile(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
        }}
      >
        編輯個人資料
        <IconButton onClick={() => setIsEditingProfile(false)} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              姓名
            </Typography>
            <TextField
              fullWidth
              name="displayName"  // 修正：改為 displayName
              value={formData.displayName}
              onChange={handleChange}
              size="small"
              placeholder="輸入您的姓名"
              variant="outlined"
              disabled={loading}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              個人簡介
            </Typography>
            <TextField
              fullWidth
              name="info"  // 修正：改為 info
              value={formData.info}
              onChange={handleChange}
              multiline
              rows={3}
              placeholder="輸入您的個人簡介"
              variant="outlined"
              disabled={loading}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          variant="outlined"
          onClick={() => setIsEditingProfile(false)}
          sx={{ borderRadius: 2, px: 3 }}
          disabled={loading}
        >
          取消
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ borderRadius: 2, px: 3, bgcolor: 'primary.main' }}
          disabled={loading}
        >
          {loading ? '儲存中...' : '儲存'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}