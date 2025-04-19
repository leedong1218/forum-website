import { EditPopupTypes } from "@/lib/types/userProfileType";
import { Close } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function EditPopup({isEditingProfile, setIsEditingProfile, userData, onSave}: EditPopupTypes) {
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    bio: userData?.bio || "",
    location: userData?.location || "",
    website: userData?.website || ""
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setIsEditingProfile(false);
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              size="small"
              placeholder="輸入您的姓名"
              variant="outlined"
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              個人簡介
            </Typography>
            <TextField
              fullWidth
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              multiline
              rows={3}
              placeholder="輸入您的個人簡介"
              variant="outlined"
            />
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button 
          variant="outlined" 
          onClick={() => setIsEditingProfile(false)}
          sx={{ borderRadius: 2, px: 3 }}
        >
          取消
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          sx={{ borderRadius: 2, px: 3, bgcolor: 'primary.main' }}
        >
          儲存
        </Button>
      </DialogActions>
    </Dialog>
  );
}