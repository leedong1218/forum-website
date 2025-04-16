import Layout from "@/components/layout/Layout";
import {
  Box, Button, FormControl, InputLabel, MenuItem, Select,
  TextField, Typography, CircularProgress, Tooltip,
  Paper, Divider
} from "@mui/material";
import { useEffect, useState } from "react";
import PostAPI from "@/services/Post/PostAPI";
import { useMessageModal } from "@/lib/context/MessageModalContext";
import { ModalTypes } from "@/lib/types/modalType";
import { CreatableBoardItem } from "@/lib/types/boardsType";
import BoardsAPI from "@/services/Boards/BoardsAPI";
import router from "next/router";
import UploadAttachment from "@/components/common/UploadAttachment";
import RichTextEditor from "@/components/common/Post/PostRichTextEditor";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    content: "",
  });
  const [boards, setBoards] = useState<CreatableBoardItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const { setIsShow, setModalProps } = useMessageModal();

  useEffect(() => {
    (async () => {
      try {
        const res = await BoardsAPI.listCreatableBoards();
        setBoards(res.data);
      } catch (err) {
        console.error("載入看板失敗", err);
      }
    })();
  }, []);

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.type && formData.title && formData.content;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setModalProps({
        type: ModalTypes.WARNING,
        message: "請填寫所有必填欄位",
      });
      setIsShow(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await PostAPI.create({
        board: Number(formData.type),
        title: formData.title,
        content: formData.content,
        attachments,
      });

      const boardUrl = res.data?.board_url;
      setModalProps({
        type: ModalTypes.SUCCESS,
        message: res.message || "發布成功",
        handleClick: () => {
          if (boardUrl) {
            router.push(`/forum/${boardUrl}`);
          }
          setIsShow(false);
        },
      });
      setIsShow(true);
      setFormData({ type: "", title: "", content: "" });
      setAttachments([]);
    } catch (error: any) {
      console.error("Error submitting post:", error);
      setModalProps({
        type: ModalTypes.ERROR,
        message: error?.message || "發布失敗，請稍後再試。",
      });
      setIsShow(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const SelectMenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: "auto",
        minWidth: 180,
      },
    },
  };

  const getSelectedBoardName = () => {
    if (!formData.type) return "";
    const selectedBoard = boards.find(board => String(board.id) === formData.type);
    return selectedBoard ? selectedBoard.name : "";
  };

  return (
    <Layout>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          mb: 4,
          p: 3,
          borderRadius: 2,
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} color="text.primary">
          新增文章
        </Typography>

        <Box mb={3} display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          <FormControl sx={{ minWidth: 180, maxWidth: { xs: "100%", sm: 250 } }}>
            <InputLabel id="board-select-label">選擇看板</InputLabel>
            <Select
              labelId="board-select-label"
              id="board-select"
              value={formData.type}
              label="選擇看板"
              onChange={(e) => handleFormChange("type", e.target.value)}
              MenuProps={SelectMenuProps}
              renderValue={() => (
                <Tooltip title={getSelectedBoardName()} arrow placement="top">
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center",
                    maxWidth: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap"
                  }}>
                    {formData.type && (
                      <>
                        {boards.find(b => String(b.id) === formData.type)?.avatar && (
                          <Box
                            component="img"
                            src={boards.find(b => String(b.id) === formData.type)?.avatar}
                            alt={getSelectedBoardName()}
                            width={20}
                            height={20}
                            sx={{ borderRadius: "50%", mr: 1, flexShrink: 0 }}
                          />
                        )}
                        <Typography component="span" noWrap>
                          {getSelectedBoardName()}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Tooltip>
              )}
            >
              {boards.length === 0 ? (
                <MenuItem value="" disabled>
                  無可用的看板
                </MenuItem>
              ) : (
                boards.map((board) => (
                  <MenuItem key={board.id} value={String(board.id)}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                      {board.avatar && (
                        <Box
                          component="img"
                          src={board.avatar}
                          alt={board.name}
                          width={20}
                          height={20}
                          sx={{ borderRadius: "50%", mr: 1, flexShrink: 0 }}
                        />
                      )}
                      <Typography component="span">
                        {board.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="文章標題"
            variant="outlined"
            value={formData.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle1" mb={1}>
            文章內容
          </Typography>
          <div style={{ height: "400px" }}>
            <RichTextEditor
              value={formData.content}
              onChange={(content: string) => handleFormChange("content", content)}
            />
          </div>
        </Box>

        <UploadAttachment
          attachments={attachments}
          setAttachments={setAttachments}
        />

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => router.back()}
          >
            取消
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={isSubmitting || !isFormValid()}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSubmitting ? "發布中..." : "發布文章"}
          </Button>
        </Box>
      </Paper>
    </Layout>
  );
}