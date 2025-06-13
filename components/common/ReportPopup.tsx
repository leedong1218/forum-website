import { useState } from "react";
import { 
  IconButton, 
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Alert
} from "@mui/material";
import {
  Close
} from "@mui/icons-material";

// Report reasons
const reportReasons = [
  { value: 'spam', label: '垃圾訊息或廣告' },
  { value: 'harassment', label: '騷擾或霸凌' },
  { value: 'hate', label: '仇恨言論' },
  { value: 'violence', label: '暴力或危險內容' },
  { value: 'inappropriate', label: '不當內容' },
  { value: 'copyright', label: '侵犯版權' },
  { value: 'fake', label: '虛假資訊' },
  { value: 'other', label: '其他' }
];
// Report Dialog Component
export const ReportDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!selectedReason) return;
    
    setIsSubmitting(true);
    
    // 模擬提交過程
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // 2秒後關閉對話框並重置狀態
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedReason('');
        setAdditionalInfo('');
        onClose();
      }, 2000);
    }, 1000);
  };

  const handleClose = () => {
    if (isSubmitting) return; // 提交中不允許關閉
    setSelectedReason('');
    setAdditionalInfo('');
    setShowSuccess(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '400px'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h6" fontWeight="600">
          檢舉內容
        </Typography>
        <IconButton 
          onClick={handleClose} 
          size="small"
          disabled={isSubmitting}
          sx={{ color: 'grey.500' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        {showSuccess ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            感謝您的檢舉，我們將會盡快處理此內容。
          </Alert>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              請選擇檢舉原因，我們會根據社群規範進行審核。
            </Typography>
            
            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                檢舉原因
              </Typography>
              <RadioGroup
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
              >
                {reportReasons.map((reason) => (
                  <FormControlLabel
                    key={reason.value}
                    value={reason.value}
                    control={<Radio size="small" />}
                    label={reason.label}
                    sx={{ 
                      mb: 0.5,
                      '& .MuiFormControlLabel-label': {
                        fontSize: '0.9rem'
                      }
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="補充說明（選填）"
              placeholder="請詳細描述檢舉原因或提供更多資訊"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <Typography variant="caption" color="text.secondary">
              提交檢舉後，我們會在24小時內進行審核。濫用檢舉功能可能會受到限制。
            </Typography>
          </>
        )}
      </DialogContent>
      
      {!showSuccess && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleClose} 
            color="inherit"
            disabled={isSubmitting}
          >
            取消
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            disabled={!selectedReason || isSubmitting}
            sx={{ 
              minWidth: '80px',
              backgroundColor: 'error.main',
              '&:hover': {
                backgroundColor: 'error.dark'
              }
            }}
          >
            {isSubmitting ? '提交中...' : '提交檢舉'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};