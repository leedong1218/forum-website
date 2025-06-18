import {
  Box, Typography, Chip, Grid, Card, CardMedia,
  CardContent, IconButton, Button
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  Download as DownloadIcon
} from "@mui/icons-material";
import { useRef } from "react";
import { getFileAttributes, formatFileSize } from "@/lib/utils/fileUtils";

interface Props {
  attachments: File[];
  setAttachments: (files: File[]) => void;
  update?: boolean;
}

export default function UploadAttachment({ attachments, setAttachments, update = false }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAttachments([...attachments, ...filesArray]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box mb={3}>
      <Typography variant="subtitle1" mb={1} display="flex" alignItems="center">
        <CloudUploadIcon fontSize="small" sx={{ mr: 0.5 }} />
        附加檔案 {update ? '(先前上傳的檔案會消失，請自行下載後重新上傳)' : ''}
        {attachments.length > 0 && (
          <Chip label={`${attachments.length} 個檔案`} size="small" color="primary" variant="outlined" sx={{ ml: 1 }} />
        )}
      </Typography>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={handleFileChange}
      />

      <Box p={2} border={1} borderColor="divider" borderRadius={1} bgcolor="grey.50">
        {attachments.length > 0 ? (
          <Grid container spacing={2}>
            {attachments.map((file, index) => {
              const { icon, color, type } = getFileAttributes(file.name);
              const isImage = type === "image";
              const fileUrl = URL.createObjectURL(file);

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card variant="outlined" sx={{ position: "relative" }}>
                    {isImage ? (
                      <>
                        <CardMedia
                          component="img"
                          height="120"
                          image={fileUrl}
                          alt={file.name}
                          sx={{ objectFit: "cover" }}
                        />
                        <Box sx={{ position: "absolute", top: 5, right: 5, display: "flex", gap: 1 }}>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: "rgba(255,255,255,0.8)",
                              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                            }}
                            onClick={() => handleRemoveFile(index)}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                          <a
                            href={fileUrl}
                            download={file.name}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <IconButton
                              size="small"
                              sx={{
                                bgcolor: "rgba(255,255,255,0.8)",
                                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                              }}
                            >
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </a>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={120}
                          bgcolor={`${color}15`}
                          color={color}
                          fontSize={40}
                        >
                          {icon}
                        </Box>
                        <IconButton
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            bgcolor: "rgba(255,255,255,0.8)",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                          }}
                          onClick={() => handleRemoveFile(index)}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </>
                    )}
                    <CardContent sx={{ py: 1 }}>
                      <Typography variant="body2" noWrap title={file.name}>
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatFileSize(file.size)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box
            py={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bgcolor="background.paper"
            border={1}
            borderColor="divider"
            borderRadius={1}
            onClick={handleFileUploadClick}
            sx={{ cursor: "pointer", borderStyle: "dashed" }}
          >
            <CloudUploadIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="body1" color="text.secondary">
              點擊或拖曳檔案到此處上傳
            </Typography>
            <Typography variant="caption" color="text.secondary" mt={0.5}>
              支援各種檔案格式
            </Typography>
          </Box>
        )}

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CloudUploadIcon />}
            onClick={handleFileUploadClick}
            size="small"
          >
            上傳更多檔案
          </Button>
        </Box>
      </Box>
    </Box>
  );
}