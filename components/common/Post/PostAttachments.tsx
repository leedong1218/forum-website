import { useState } from "react";
import {
  Box, Typography, Grid, Stack, Paper, Avatar,
  Modal, Fade, Backdrop, IconButton
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Attachment } from "@/lib/types/attachmentType";
import { getFileAttributes, formatFileSize } from "@/lib/utils/fileUtils";

interface NormalizedAttachment {
  id: number;
  url: string;
  name: string;
  size: number;
  type: "image" | "pdf" | "file";
}

interface Props {
  attachments: Attachment[];
}

const normalizeAttachments = (raw: Attachment[]): NormalizedAttachment[] =>
  raw.map((att) => {
    const { type } = getFileAttributes(att.original_filename);
    return {
      id: att.id,
      url: att.url,
      name: att.original_filename,
      size: att.size,
      type,
    };
  });

export default function PostAttachments({ attachments }: Props) {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<NormalizedAttachment | null>(null);
  
  if (!attachments || attachments.length === 0) return null;

  const normalized = normalizeAttachments(attachments);
  
  // 處理圖片點擊預覽
  const handleImageClick = (image: NormalizedAttachment) => {
    setSelectedImage(image);
  };

  // 關閉預覽
  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  // 檔案點擊
  const handleFileClick = (file: NormalizedAttachment) => {
    window.open(file.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box mt={3} mb={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          bgcolor: "grey.50",
          border: "1px solid",
          borderColor: "divider",
          position: "relative",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            position: "absolute",
            top: -10,
            left: 20,
            bgcolor: "background.paper",
            px: 2,
            py: 0.5,
            borderRadius: 1,
            color: "text.secondary",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          附加檔案
        </Typography>

        <Grid container spacing={2} mt={1}>
          {normalized.filter((att) => att.type === "image").length > 0 && (
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight={500}
                mb={1}
              >
                圖片
              </Typography>
              <Grid container spacing={2}>
                {normalized
                  .filter((att) => att.type === "image")
                  .map((image) => (
                    <Grid item xs={6} sm={4} md={3} key={image.id}>
                      <Box
                        onClick={() => handleImageClick(image)}
                        sx={{
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow: theme.shadows[1],
                          transition: "all 0.2s",
                          position: "relative",
                          paddingTop: "75%",
                          cursor: "pointer",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: theme.shadows[4],
                            "& .image-overlay": {
                              opacity: 1,
                            },
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={image.url}
                          alt={image.name}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <Box
                          className="image-overlay"
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 1,
                            bgcolor: "rgba(0,0,0,0.5)",
                            color: "white",
                            fontSize: "0.75rem",
                            display: "flex",
                            justifyContent: "space-between",
                            opacity: 0,
                            transition: "opacity 0.2s",
                          }}
                        >
                          <Box
                            sx={{
                              width: "75%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {image.name}
                          </Box>
                          <Box>{formatFileSize(image.size)}</Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          )}

          {normalized.filter((att) => att.type !== "image").length > 0 && (
            <Grid item xs={12} mt={normalized.filter((att) => att.type === "image").length > 0 ? 2 : 0}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight={500}
                mb={1}
              >
                文件
              </Typography>
              <Stack spacing={1.5}>
                {normalized
                  .filter((att) => att.type !== "image")
                  .map((file) => {
                    const { icon, color } = getFileAttributes(file.name);
                    return (
                      <Paper
                        key={file.id}
                        onClick={() => handleFileClick(file)}
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: 2,
                          backgroundColor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "primary.main",
                            backgroundColor: "rgba(25, 118, 210, 0.04)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              bgcolor: `${color}15`,
                              color,
                              mr: 2,
                            }}
                          >
                            {icon}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={500}>
                              {file.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatFileSize(file.size)}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    );
                  })}
              </Stack>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* 圖片預覽模態框 */}
      <Modal
        open={!!selectedImage}
        onClose={handleClosePreview}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          zIndex: 9999,
        }}
      >
        <Fade in={!!selectedImage}>
          <Box
            sx={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 1,
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: -16,
                right: -16,
                bgcolor: "background.paper",
                boxShadow: 2,
                "&:hover": {
                  bgcolor: "background.paper",
                },
              }}
              onClick={handleClosePreview}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <>
                <Box
                  component="img"
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "calc(90vh - 64px)",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
                <Box 
                  mt={1} 
                  p={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderTop={1}
                  borderColor="divider"
                >
                  <Typography variant="body2" fontWeight={500}>
                    {selectedImage.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatFileSize(selectedImage.size)}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}