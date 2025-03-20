import Layout from "@/components/layout/Layout";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function CreatePost() {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleSubmit = () => {
    console.log({
      type,
      title,
      content,
    });
    // 此處可以添加表單提交邏輯，如API請求等
    alert("文章已發布！");
  };

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          mb: 4,
          p: 4,
          borderRadius: 2,
          background: "#fff",
          border: "1px solid rgba(25,118,210,0.2)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 600, mb: 3, color: "#263238" }}
        >
          新增文章
        </Typography>

        <Box sx={{ mb: 3, display: "flex" }}>
          <FormControl sx={{ mr: 2, minWidth: 150 }}>
            <InputLabel id="board-select-label">選擇看板</InputLabel>
            <Select
              labelId="board-select-label"
              id="board-select"
              value={type}
              label="選擇看板"
              onChange={handleTypeChange}
            >
              <MenuItem value={"搞笑"}>搞笑</MenuItem>
              <MenuItem value={"美食"}>美食</MenuItem>
              <MenuItem value={"科技"}>科技</MenuItem>
              <MenuItem value={"旅遊"}>旅遊</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="文章標題"
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            sx={{ mb: 2 }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            文章內容
          </Typography>
          <Editor
            apiKey="z2h5umi81d0bpq7wloj9hdo07vvct4vnq6xt71gplhy1zpgi" // 需要替換為您的TinyMCE API金鑰
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={handleEditorChange}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={!type || !title || !content}
          >
            發布文章
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
