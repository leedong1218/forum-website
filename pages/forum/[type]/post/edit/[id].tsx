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
import { useRouter } from "next/router";
import UploadAttachment from "@/components/common/UploadAttachment";
import RichTextEditor from "@/components/common/Post/PostRichTextEditor";
import { useLoading } from "@/lib/context/LoadingContext";
import { PostType } from "@/lib/types/postListType";
import { Attachment } from "@/lib/types/attachmentType";
import PostAttachments from "@/components/common/Post/PostAttachments";

export default function EditPost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    content: "",
  });
  const [boards, setBoards] = useState<CreatableBoardItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const { setIsShow, setModalProps } = useMessageModal();
  const { setLoading } = useLoading();
  const [postData, setPostData] = useState<PostType | null>(null);

  const fetchPost = async (id: string) => {
    try {
      setLoading(true);
      const res = await PostAPI.get(Number(id));
      setPostData(res.data || null);
    } catch (err) {
      console.error("取得文章失敗", err);
      setModalProps({
        type: ModalTypes.ERROR,
        message: "取得文章失敗，請稍後再試。",
      });
      setIsShow(true);
    } finally {
      setLoading(false);
    }
  };

  // 當取得文章資料後，預填表單
  useEffect(() => {
    if (postData) {
      setFormData({
        type: String(postData.board),
        title: postData.title,
        content: postData.content,
      });
    }
  }, [postData]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // 載入可建立文章的看板列表
        const boardsRes = await BoardsAPI.listCreatableBoards();
        setBoards(boardsRes.data);

        if (router.query.id) {
          await fetchPost(router.query.id as string);
        }
      } catch (err) {
        console.error("載入資料失敗", err);
        setModalProps({
          type: ModalTypes.ERROR,
          message: "載入資料失敗，請稍後再試。",
        });
        setIsShow(true);
      }
    };

    if (router.isReady) {
      initializeData();
    }
  }, [router.isReady, router.query.id]);

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
      if (!postData?.id) {
        throw new Error("無法取得文章 ID，無法更新文章。");
      }
      const res = await PostAPI.update(String(postData.id), {
        board: Number(formData.type),
        title: formData.title,
        content: formData.content,
        attachments,
      });

      const boardUrl = res.data?.board_url || res.data?.boardUrl;
      setModalProps({
        type: ModalTypes.SUCCESS,
        message: res.message || '更新成功',
        handleClick: () => {
          if (boardUrl) {
            router.push(`/forum/${boardUrl}`);
          } else {
            router.back();
          }
          setIsShow(false);
        },
      });
      setIsShow(true);

    } catch (error: any) {
      console.error("Error submitting post:", error);
      setModalProps({
        type: ModalTypes.ERROR,
        message: error?.message || (postData?.id ? "更新失敗，請稍後再試。" : "發布失敗，請稍後再試。"),
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
          {postData?.id ? "編輯文章" : "新增文章"}
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

        {postData?.attachments && postData.attachments.length > 0 && (
          <PostAttachments attachments={postData.attachments} />
        )}

        <UploadAttachment
          attachments={attachments}
          setAttachments={setAttachments}
          update={true}
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
            {isSubmitting
              ? "更新中..."
              : "更新文章"
            }
          </Button>
        </Box>
      </Paper>
    </Layout>
  );
}