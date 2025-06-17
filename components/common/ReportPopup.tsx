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
import { Close } from "@mui/icons-material";
import ReportAPI from "@/services/Report/ReportAPI"; // 你之前設定的 API 位置

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


export const ReportDialog = ({
  open,
  onClose,
  targetId,
  targetType,
}: {
  open: boolean;
  onClose: () => void;
  targetId: number;
  targetType: "post" | "comment";
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!selectedReason) return;

    setIsSubmitting(true);
    try {
      await ReportAPI.createReport({
        target_id: targetId,
        target_type: targetType,
        reason: selectedReason,
        description: additionalInfo,
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedReason('');
        setAdditionalInfo('');
        onClose();
      }, 2000);
    } catch (error) {
      console.error("檢舉提交失敗", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setSelectedReason('');
    setAdditionalInfo('');
    setShowSuccess(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="600">檢舉內容</Typography>
        <IconButton onClick={handleClose} disabled={isSubmitting}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {showSuccess ? (
          <Alert severity="success">感謝您的檢舉，我們將會盡快處理此內容。</Alert>
        ) : (
          <>
            <Typography variant="body2" sx={{ mb: 2 }}>
              請選擇檢舉原因，我們會根據社群規範進行審核。
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <RadioGroup
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
              >
                {reportReasons.map((reason) => (
                  <FormControlLabel
                    key={reason.value}
                    value={reason.value}
                    control={<Radio />}
                    label={reason.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="補充說明（選填）"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </>
        )}
      </DialogContent>
      {!showSuccess && (
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>取消</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!selectedReason || isSubmitting}
            color="error"
          >
            {isSubmitting ? '提交中...' : '提交檢舉'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
